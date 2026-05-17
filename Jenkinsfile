pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: docker
    image: docker:27.0.3
    command:
    - cat
    tty: true

    volumeMounts:
    - name: docker-sock
      mountPath: /var/run/docker.sock

  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
'''
        }
    }

    environment {
        AWS_ACCOUNT_ID = '842091915944'
        AWS_REGION = 'ap-south-1'
        BACKEND_REPO = 'self-storage-backend'
        FRONTEND_REPO = 'self-storage-frontend'
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/dikshadhait/self-storage-solution.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                container('docker') {
                    dir('backend') {
                        sh 'docker build -t self-storage-backend:latest .'
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                container('docker') {
                    dir('frontend') {
                        sh 'docker build -t self-storage-frontend:latest .'
                    }
                }
            }
        }
    }
}
