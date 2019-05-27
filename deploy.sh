#!/usr/bin/env bash

#Build the angular project
npm run build

#Function to get access keys
#Argument 1: path to credential file
#Argument 2: index (2 for access key ID, 3 for secret access key)
getKey(){
        array=()
        IFS=","
        while read -r col1
        do
                array+=($col1)
        done < $1
        echo ${array[$2]}
}

#Bucket name
bucketName="feedme.erayus.com"

#Creditial File Path
credentialFilePath="C:\Users\imrtee\Desktop\AWS\accessKeys.csv"

#Get 2 keys using the function
accessKeyID=$(getKey $credentialFilePath 2)
secretAccessKey=$(getKey $credentialFilePath 3)

#Set credentials variables as environment variables
export AWS_ACCESS_KEY_ID=$accessKeyID
export AWS_SECRET_ACCESS_KEY=$secretAccessKey

#Use 'cp --recursive' instead of 'sync' if this is your first deployment
aws s3 cp --recursive ./dist/FeedMe s3://$bucketName --acl public-read --storage-class STANDARD
