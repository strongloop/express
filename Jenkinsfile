pipeline {
    agent any
    
    stages {
        stage('Run Docker image') {
            steps {
                sh 'sudo docker run -it -d -p 3000:3000 shabuddinshaik/hello-world:latest'
            }
        }
    }
}
