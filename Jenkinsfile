pipeline {

    agent any

    tools {
        maven 'my-maven'
    }

    stages {

        stage('Build with Maven') {
            steps {
                sh 'mvn --version'
                sh 'java -version'
                sh 'mvn clean package -Dmaven.test.failure.ignore=true'
            }
        }

        stage('Packaging/Pushing image') {

             steps {
                 withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                        sh 'docker build -t minhkycho18/dictionary-app .'
                        sh 'docker push minhkycho18/dictionary-app'
                }
             }
        }

        stage('Deploy Dictionary App to Server') {
            steps {
                sh 'ls'
                sh 'docker-compose down --rmi all -v'
                sh 'docker-compose up -d'
                sleep 60
                sh 'docker compose up -d'
            }
        }

    }
    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}