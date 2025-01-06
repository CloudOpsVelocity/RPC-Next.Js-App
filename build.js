// // build.js
// const { execSync } = require('child_process');
// const fs = require('fs');

// try {
//   // Run Next.js build
//   execSync('next build', { stdio: 'inherit' });

//   // If build succeeds, create a success indicator file
//   fs.writeFileSync('build_success.txt', 'Build completed successfully');

//   console.log('Build completed successfully');
//   process.exit(0);
// } catch (error) {
//   console.error('Build failed:', error);
//   process.exit(1);
// }

// // Jenkinsfile
// // pipeline {
// //     agent any
// //     stages {
// //         stage('Build') {
// //             steps {
// //                 sh 'npm install'
// //                 sh 'node build.js'
// //             }
// //         }
// //         stage('Verify Build') {
// //             steps {
// //                 script {
// //                     if (fileExists('build_success.txt')) {
// //                         echo 'Build verified as successful'
// //                     } else {
// //                         error 'Build verification failed'
// //                     }
// //                 }
// //             }
// //         }
// //         // Additional stages for deployment, etc.
// //     }
// // }
