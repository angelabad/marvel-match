pipeline {
  agent {
    kubernetes { inheritFrom 'python' }
  }
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
