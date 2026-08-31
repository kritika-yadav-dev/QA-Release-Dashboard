pipeline {

    agent any

    environment {
        GITHUB_CREDENTIALS = credentials('github-pat')
        GITHUB_REPO = 'https://github.com/kritika-yadav-dev/QA-Release-Dashboard.git'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out the source code from GitHub...'
                checkout scm
            }
        }

        stage('Validate Files') {
            steps {
                echo 'Validating QA Release Dashboard files...'

                bat '''
                    if not exist index.html exit /b 1
                    if not exist style.css exit /b 1
                    if not exist script.js exit /b 1

                    echo All required files are present.
                '''
            }
        }

        stage('Build') {
            steps {
                echo 'Building static website...'

                bat '''
                    if not exist build mkdir build

                    copy /Y index.html build\\index.html
                    copy /Y style.css build\\style.css
                    copy /Y script.js build\\script.js

                    echo Static website build completed.
                '''
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {

                echo 'Deploying website to GitHub Pages...'

                bat '''
                    git config user.name "Jenkins"
                    git config user.email "jenkins@example.com"

                    git checkout --orphan gh-pages

                    git rm -rf .

                    copy /Y build\\index.html index.html
                    copy /Y build\\style.css style.css
                    copy /Y build\\script.js script.js

                    git add index.html style.css script.js

                    git commit -m "Deploy QA Release Dashboard from Jenkins"

                    git push https://%GITHUB_CREDENTIALS_USR%:%GITHUB_CREDENTIALS_PSW%@github.com/kritika-yadav-dev/QA-Release-Dashboard.git gh-pages --force
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully.'
            echo 'QA Release Dashboard has been deployed.'
        }

        failure {
            echo 'CI/CD pipeline failed. Deployment was not completed.'
        }
    }
}
