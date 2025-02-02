pipeline {
    agent any

    stages {
        stage('Check Branch') {
            when {
                expression { env.BRANCH_NAME =~ /^(dev|main)$/ }
            }
            steps {
                echo "Running pipeline for branch: ${env.BRANCH_NAME}"
            }
        }

        stage('Build') {
            steps {
                echo "Building the application..."
                sh "npm install"
                sh "npm build"

            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying the application..."
            }
        }
    }
}
