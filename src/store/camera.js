function camera () {
  this.strName = 'Cam1';
  this.strToken = '';
  this.strUrl = 'rtsp://192.168.1.1/stream';
  this.strUser = 'admin';
  this.strPasswd = '12345';
  this.strSrcIpAddress = '192.168.1.1';// ip1

  this.strSrcPort = '80';
  this.nType = 'H5_STREAM';
}
export default camera
