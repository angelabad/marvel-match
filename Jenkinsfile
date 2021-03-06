pipeline {
  stages {
    node('python') {
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
