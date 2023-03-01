pipeline {
    agent any
    
    tools {
        maven 'Maven' // configure a Maven tool named "Maven" in Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            environment {
                MAVEN_HOME = tool 'Maven'
                PATH = "$MAVEN_HOME/bin:$PATH"
            }
            steps {
                sh 'mvn clean compile -e'
            }
        }
    }
}
