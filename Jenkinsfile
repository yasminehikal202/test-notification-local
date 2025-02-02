pipeline {
    agent any

    environment {
        REPO_URL = 'git@github.com:your-org/your-laravel-repo.git'
        BRANCH = 'dev'  // Change to 'dev' if needed
        IMAGE_NAME = "laravel_app"
        CONTAINER_NAME = "laravel_container"
        DEPLOY_PATH = "/var/www/laravel"
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    echo "Checking out the latest code..."
                    checkout([$class: 'GitSCM', 
                        branches: [[name: "*/${BRANCH}"]],
                        userRemoteConfigs: [[url: REPO_URL]]
                    ])
                }
            }
        }

        stage('Pull Latest Changes') {
            steps {
                script {
                    echo "Fetching latest updates..."
                    sh "git pull origin ${BRANCH}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Laravel Docker Image..."
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Run Laravel Container') {
            steps {
                script {
                    echo "Stopping old container..."
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"

                    echo "Starting new Laravel container..."
                    sh """
                        docker run -d --name ${CONTAINER_NAME} \
                        -p 8000:80 \
                        -v ${DEPLOY_PATH}:/var/www/html \
                        ${IMAGE_NAME}
                    """
                }
            }
        }

        stage('Run Migrations') {
            steps {
                script {
                    echo "Running database migrations..."
                    sh "docker exec ${CONTAINER_NAME} php artisan migrate --force"
                }
            }
        }

        stage('Restart Laravel Services') {
            steps {
                script {
                    sh "docker exec ${CONTAINER_NAME} php artisan queue:restart"
                    sh "docker exec ${CONTAINER_NAME} php artisan config:clear"
                    sh "docker exec ${CONTAINER_NAME} php artisan cache:clear"
                }
            }
        }

        stage('Deployment Complete') {
            steps {
                echo "Laravel app deployed successfully!"
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed. Check logs!"
        }
    }
}
