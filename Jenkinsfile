pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod

spec:
  containers:

  - name: kaniko
    image: gcr.io/kaniko-project/executor:latest
    command:
  - /busybox/cat
tty: true

    volumeMounts:
      - name: docker-config
        mountPath: /kaniko/.docker

  volumes:
    - name: docker-config
      secret:
        secretName: ecr-secret
        items:
          - key: .dockerconfigjson
            path: config.json
'''
        }
    }

    environment {
        AWS_ACCOUNT_ID = '842091915944'
        AWS_REGION = 'ap-south-1'
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/dikshadhait/self-storage-solution.git'
            }
        }

        stage('Build & Push Backend') {
            steps {
                container('kaniko') {

                    sh '''
                    /kaniko/executor \
                      --context `pwd`/backend \
                      --dockerfile `pwd`/backend/Dockerfile \
                      --destination 842091915944.dkr.ecr.ap-south-1.amazonaws.com/self-storage-backend:latest
                    '''
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                container('kaniko') {

                    sh '''
                    /kaniko/executor \
                      --context `pwd`/frontend \
                      --dockerfile `pwd`/frontend/Dockerfile \
                      --destination 842091915944.dkr.ecr.ap-south-1.amazonaws.com/self-storage-frontend:latest
                    '''
                }
            }
        }
    }
}
