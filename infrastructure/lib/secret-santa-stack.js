"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretSantaStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const aws_s3_1 = require("aws-cdk-lib/aws-s3");
class SecretSantaStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const api = new aws_apigateway_1.LambdaRestApi(this, 'SecretSantaApi', {
            handler: backend,
            proxy: false,
        });
        const authLambda = new aws_lambda_nodejs_1.NodejsFunction(this, 'AuthLambda', {
            handler: 'index.handler',
        });
        const auth = new aws_apigateway_1.TokenAuthorizer(this, 'SecretSantaAuthorizer', {
            handler: authLambda,
        });
        const login = api.root.addResource('login');
        login.addMethod('POST');
        const complete = api.root.addResource('complete');
        complete.addMethod('POST');
        const loginLambda = new aws_lambda_nodejs_1.NodejsFunction(this, 'LoginLambda', {
            handler: 'index.handler',
        });
        const completeLambda = new aws_lambda_nodejs_1.NodejsFunction(this, 'CompleteLambda', {
            handler: 'index.handler',
        });
        const websiteBucket = new aws_s3_1.Bucket(this, 'SecretSantaBucket', {
            bucketName: 'nik-secret-santa-site',
        });
    }
}
exports.SecretSantaStack = SecretSantaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjcmV0LXNhbnRhLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VjcmV0LXNhbnRhLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFnRDtBQUNoRCwrREFBNEU7QUFFNUUscUVBQStEO0FBQy9ELCtDQUE0QztBQUk1QyxNQUFhLGdCQUFpQixTQUFRLG1CQUFLO0lBQ3pDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxHQUFHLEdBQUcsSUFBSSw4QkFBYSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUNwRCxPQUFPLEVBQUUsT0FBTztZQUNoQixLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLElBQUksa0NBQWMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3hELE9BQU8sRUFBRSxlQUFlO1NBQ3pCLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLElBQUksZ0NBQWUsQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUU7WUFDOUQsT0FBTyxFQUFFLFVBQVU7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNCLE1BQU0sV0FBVyxHQUFHLElBQUksa0NBQWMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQzFELE9BQU8sRUFBRSxlQUFlO1NBQ3pCLENBQUMsQ0FBQztRQUNILE1BQU0sY0FBYyxHQUFHLElBQUksa0NBQWMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDaEUsT0FBTyxFQUFFLGVBQWU7U0FDekIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxhQUFhLEdBQUcsSUFBSSxlQUFNLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQzFELFVBQVUsRUFBRSx1QkFBdUI7U0FDcEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBakNELDRDQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgTGFtYmRhUmVzdEFwaSwgVG9rZW5BdXRob3JpemVyIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0IHsgSUZ1bmN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBOb2RlanNGdW5jdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEtbm9kZWpzJztcbmltcG9ydCB7IEJ1Y2tldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcblxuZGVjbGFyZSBjb25zdCBiYWNrZW5kOiBJRnVuY3Rpb247XG5leHBvcnQgY2xhc3MgU2VjcmV0U2FudGFTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBhcGkgPSBuZXcgTGFtYmRhUmVzdEFwaSh0aGlzLCAnU2VjcmV0U2FudGFBcGknLCB7XG4gICAgICBoYW5kbGVyOiBiYWNrZW5kLFxuICAgICAgcHJveHk6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgYXV0aExhbWJkYSA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCAnQXV0aExhbWJkYScsIHtcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICB9KTtcbiAgICBjb25zdCBhdXRoID0gbmV3IFRva2VuQXV0aG9yaXplcih0aGlzLCAnU2VjcmV0U2FudGFBdXRob3JpemVyJywge1xuICAgICAgaGFuZGxlcjogYXV0aExhbWJkYSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGxvZ2luID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UoJ2xvZ2luJyk7XG4gICAgbG9naW4uYWRkTWV0aG9kKCdQT1NUJyk7XG5cbiAgICBjb25zdCBjb21wbGV0ZSA9IGFwaS5yb290LmFkZFJlc291cmNlKCdjb21wbGV0ZScpO1xuICAgIGNvbXBsZXRlLmFkZE1ldGhvZCgnUE9TVCcpO1xuXG4gICAgY29uc3QgbG9naW5MYW1iZGEgPSBuZXcgTm9kZWpzRnVuY3Rpb24odGhpcywgJ0xvZ2luTGFtYmRhJywge1xuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgIH0pO1xuICAgIGNvbnN0IGNvbXBsZXRlTGFtYmRhID0gbmV3IE5vZGVqc0Z1bmN0aW9uKHRoaXMsICdDb21wbGV0ZUxhbWJkYScsIHtcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHdlYnNpdGVCdWNrZXQgPSBuZXcgQnVja2V0KHRoaXMsICdTZWNyZXRTYW50YUJ1Y2tldCcsIHtcbiAgICAgIGJ1Y2tldE5hbWU6ICduaWstc2VjcmV0LXNhbnRhLXNpdGUnLFxuICAgIH0pO1xuICB9XG59XG4iXX0=