import axios from 'axios';
import { createHmac } from 'crypto';
import { DateTime } from 'luxon';

axios.interceptors.request.use((request) => console.log(request));

// Super simple "REST" API
exports.handler = async (event: any, context: any) => {
  let statusCode = 200;
  let responseBody: any = { message: 'Success' };
  switch (event.resource) {
    case '/login': {
      console.log('Login endpoint invoked');
      const body = JSON.parse(event.body);
      if (!body) {
        statusCode = 400;
        responseBody.message = 'Bad Request: no body provided';
      } else {
        const { code } = body;
        if (code !== process.env.CODE) {
          statusCode = 401;
          responseBody.message = 'Unauthorized: code is invalid';
        }
      }
      break;
    }
    case '/complete': {
      console.log('Complete endpoint invoked');
      const body = JSON.parse(event.body);
      if (!body) {
        statusCode = 400;
        responseBody.message = 'Bad Request: no body provided';
      } else {
        const { code } = body;
        // Check the login code again so user can't just go to this endpoint
        if (code !== process.env.CODE) {
          statusCode = 401;
          responseBody.message = 'Unauthorized: code is invalid';
        } else {
          const response = await showAccount(process.env.WALLET!).catch(
            (err) => {
              console.log(err.response.data);
            }
          );
          console.log(response);
        }
      }

      break;
    }
    default:
      statusCode = 400;
      responseBody.message = 'Endpoint not implemented';
  }
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Headers':
        'Content-Type,Authorization,X-Api-Key,x-api-key',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(responseBody),
  };
};

const listAccounts = async () => {
  const url = `https://api.coinbase.com/`;
  const path = `/v2/accounts`;
  return await axios.get(url + path, {
    headers: buildCoinbaseHeaders(path, 'GET'),
  });
};
const showAccount = async (id: string) => {
  const url = `https://api.coinbase.com/`;
  const path = `/v2/accounts/${id}`;
  return await axios.get(url + path, {
    headers: buildCoinbaseHeaders(path, 'GET'),
  });
};
const sendBTC = async (id: string, to: string, amount: number) => {
  const url = `https://api.coinbase.com`;
  const path = `/v2/accounts/${id}/transactions`;
  const body = {
    type: 'send',
    to,
    amount,
    currency: 'BTC',
  };
  return await axios.post(url + path, body, {
    headers: {
      ...buildCoinbaseHeaders(path, 'POST', body),
      'Content-Type': 'application/json',
    },
  });
};

const buildCoinbaseHeaders = (
  url: string,
  method: 'GET' | 'POST',
  body?: Record<string, unknown>
) => {
  const timestamp = Math.floor(DateTime.utc().toMillis() / 1000);
  let what = timestamp + method + url;
  if (body) {
    what += JSON.stringify(body);
  }
  const hmac = createHmac('sha256', process.env.API_KEY_SECRET!);
  const signature = hmac.update(what).digest('hex');
  const headers = {
    'CB-ACCESS-KEY': process.env.API_KEY!,
    'CB-ACCESS-SIGN': signature,
    'CB-ACCESS-TIMESTAMP': timestamp.toString(),
    'CB-VERSION': '2021-12-09',
  };
  console.log(headers);
  return headers;
};
