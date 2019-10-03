import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {
  region: string;
  IdentityPoolId: string;

  constructor(private http: HttpClient) {
      this.region = 'ap-southeast-2';
      this.IdentityPoolId = 'ap-southeast-2:2671c2c5-2369-4998-9f01-79737f454df3';
      // Configures the AWS service and initial authorization
      AWS.config.update({
        region: this.region,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.IdentityPoolId
        })
      });
  }

  uploadFileToS3Bucket(bucketName: string, file, fileType){
    return new Promise ((resolve, reject) => {
      // adds the S3 service, make sure the api version and bucket are correct
    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: bucketName}
    });
    // I store this in a variable for retrieval later
    s3.upload({
      Key: file.name,
      Bucket: bucketName,
      Body: file,
      ContentType: fileType,
      ACL: 'public-read'
    }, (err, data) => {
      const imageURL = data.Location;
      resolve(imageURL)
      if (err) {
        reject(err);
      }
    });
  })
  }

  sendEmail(){
    const emailData = {
      subject: "FeedMe Testing",
      body: "This is from FeedMe"
    };
    this.http.post('https://8wdtpe73z5.execute-api.us-east-1.amazonaws.com/dev/', JSON.stringify(emailData)
    ).subscribe(
      (res) => console.log(res)
    );
  }


}
