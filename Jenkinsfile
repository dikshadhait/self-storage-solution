pipeline {
    agent {
    label 'built-in'
}

    environment {
        AWS_ACCOUNT_ID = '842091915944'
        AWS_REGION = 'ap-south-1'

        FRONTEND_REPO = 'self-storage-frontend'
        BACKEND_REPO = 'self-storage-backend'

        IMAGE_TAG = 'latest'
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main',
                credentialsId: 'github-creds',
                url: 'https://github.com/dikshadhait/self-storage-solution.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh '''
                    docker build -t $BACKEND_REPO:$IMAGE_TAG .
                    '''
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh '''
                    docker build -t $FRONTEND_REPO:$IMAGE_TAG .
                    '''
                }
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                withAWS(credentials: 'aws-creds', region: "${AWS_REGION}") {
                    sh '''
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                    '''
                }
            }
        }

        stage('Tag Docker Images') {
            steps {
                sh '''
                docker tag $BACKEND_REPO:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$BACKEND_REPO:$IMAGE_TAG

                docker tag $FRONTEND_REPO:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$FRONTEND_REPO:$IMAGE_TAG
                '''
            }
        }

        stage('Push Backend Image') {
            steps {
                sh '''
                docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$BACKEND_REPO:$IMAGE_TAG
                '''
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh '''
                docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$FRONTEND_REPO:$IMAGE_TAG
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl rollout restart deployment backend-deployment -n self-storage

                kubectl rollout restart deployment frontend-deployment -n self-storage
                '''
            }
        }
    }
}
