pipeline {
  agent {
    label 'python'
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
