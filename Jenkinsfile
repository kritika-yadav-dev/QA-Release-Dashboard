pipeline {

    agent any

    options {
        skipDefaultCheckout(true)
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

                withCredentials([
                    usernamePassword(
                        credentialsId: 'github-pat',
                        usernameVariable: 'GIT_USERNAME',
                        passwordVariable: 'GIT_PASSWORD'
                    )
                ]) {

                    bat '''
                        git config user.name "Jenkins"
                        git config user.email "jenkins@example.com"

                        if exist .git\\refs\\heads\\gh-pages git branch -D gh-pages

                        git checkout -B gh-pages

                        git rm -rf .

                        copy /Y build\\index.html index.html
                        copy /Y build\\style.css style.css
                        copy /Y build\\script.js script.js

                        git add index.html style.css script.js

                        git commit -m "Deploy QA Release Dashboard from Jenkins"

                        git push https://%GIT_USERNAME%:%GIT_PASSWORD%@github.com/kritika-yadav-dev/QA-Release-Dashboard.git gh-pages --force
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully.'
            echo 'QA Release Dashboard deployed to GitHub Pages.'
        }

        failure {
            echo 'CI/CD pipeline failed. Deployment was not completed.'
        }
    }
}
