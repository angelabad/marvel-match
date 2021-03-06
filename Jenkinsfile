pipeline {
  agent { kubernetes {} }
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
