docker build . -t rgskartner/skartner-server --platform linux/amd64

docker push rgskartner/skartner-server

source ../skartner-instance/envs/skartner-jenkins/staging.env

# echo "JENKINS_API_KEY: $JENKINS_API_KEY"

curl -X POST http://jenkins.skartner.com/job/restart-skartner-server/build --user dev-rahul:$JENKINS_API_KEY