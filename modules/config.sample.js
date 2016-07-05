'use strict';

(function(self){
  self.uwalk = self.uwalk || {};
  self.uwalk.API = '';

  self.uwalk.production = self.uwalk.production || {};
  self.uwalk.production.accessKeyId = 'Amazon_s3_production_access_key';
  self.uwalk.production.secretAccessKey = 'Amazon_s3_production_secret_key';
  self.uwalk.production.region = 'Amazon_s3_production_region';
  self.uwalk.production.params = self.uwalk.production.params || {};
  self.uwalk.production.params.Bucket = 'Amazon_s3_production_bucket_name';

})(window);
