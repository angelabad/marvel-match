pipeline {
  agent { kubernetes {
      inheritFrom 'python'
    } 
  }
  
  stages {
    stage('Build') {
      steps {     
        container('node') {
          sh 'npm -g install yarn'
          sh 'yarn'
        }  
      }
    }
  }
  
}
