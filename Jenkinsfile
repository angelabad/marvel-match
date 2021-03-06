pipeline {
  agent { kubernetes {} }
  
    stages {
      stage('Build') {
        node('python') {
        steps {     
          container('node') {
            sh 'npm install'
          }
        }
      }
    }
  }
}
