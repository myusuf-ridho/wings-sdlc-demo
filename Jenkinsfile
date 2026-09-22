// Wings SDLC Demo — declarative CI pipeline.
//
// Prerequisites on the existing Jenkins controller (one-time setup):
//   1. NodeJS tool named "NodeJS-20"          (Manage Jenkins → Tools)
//   2. SonarQube server named "SonarQube"     (Manage Jenkins → System, with auth token)
//   3. SonarQube Scanner tool named "SonarQubeScanner" (Manage Jenkins → Tools)
//   4. SonarQube webhook pointing to <jenkins-url>/sonarqube-webhook/ (quality gate callback)
//
// No URLs or credentials are stored in this file — everything is injected
// from the Jenkins global configuration.

pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    // API unit tests write coverage to apps/api/coverage (lcov)
                    archiveArtifacts artifacts: 'apps/api/coverage/lcov.info', allowEmptyArchive: true
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    scannerHome = tool 'SonarQubeScanner'
                }
                withSonarQubeEnv('SonarQube') {
                    sh "${scannerHome}/bin/sonar-scanner"
                }
            }
        }

        stage('Quality Gate') {
            steps {
                // Pipeline fails here if the SonarQube quality gate is not green.
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline green: install, lint, test, build, SonarQube analysis and quality gate all passed.'
        }
        failure {
            echo 'Pipeline failed — check the failing stage log and the SonarQube project report.'
        }
    }
}
