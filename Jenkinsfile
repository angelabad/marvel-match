pipeline {
  agent {
    kubernetes {} 
  }
  node ('python') {
    stages {
      stage('Build') {
        steps {     
          container('node') {
            sh 'npm install'
          }
        }
      }
    }
  }
}
