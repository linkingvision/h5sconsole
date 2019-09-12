/** 
 *=================Event API
 *
 */
/** 
 * Interface with h5s Event API
 * @constructor
 * @param 
 var conf = {
	protocol: window.location.protocol, // {string} - 'http:' or 'https:'
	host: window.location.host, //{string} - 'localhost:8080'
	rootpath:window.location.pathname, // {string} - path of the app running
	callback: EventCB, //{function}(event(string), userdata(object)) 
	userdata: user data // user data
	session:'c1782caf-b670-42d8-ba90-2244d0b0ee83' //{string} - session got from login
};
*/

function H5sEvent(conf)
{
	this.wsSocket;
	this.keepaliveTimerId;
	this.bNeedReconnect = false;
	this.bDisConnected = false;

	this._conf = conf;	
}

H5sEvent.prototype.ReconnectFunction = function() 
{
	//console.log('Try Reconnect...', this.bNeedReconnect);
	if (this.bNeedReconnect === true)
	{
		console.log('Reconnect...');
		
		this.setupWebSocket(this._token);
		this.bNeedReconnect = false;
	}
	//console.log('Try Reconnect...', this.bNeedReconnect);
}
	
	
H5sEvent.prototype.H5SWebSocketClient = function(h5spath) 
{
	var socket;
	console.log("H5SWebSocketClient");
	try {
		//alert(this._conf.protocol);
		if (this._conf.protocol == "http:") 
		{
			if (typeof MozWebSocket != "undefined")
			{
				socket = new MozWebSocket('ws://' + this._conf.host  +  h5spath);
			}else
			{
				socket = new WebSocket('ws://' + this._conf.host +  h5spath);
			}
		}
		if (this._conf.protocol == "https:")
		{	
			//alert(this._conf.host);
			console.log(this._conf.host);
			if (typeof MozWebSocket != "undefined")
			{
				socket = new MozWebSocket('wss://' + this._conf.host +  h5spath);
			}else
			{
				socket = new WebSocket('wss://' + this._conf.host + h5spath);
			}				
		}
		console.log(this._conf.host);
	} catch (e) {
		alert('error');
		return;
	}
	return socket;
}

H5sEvent.prototype.keepaliveTimer = function()	
{
	try {
		var j = {};
		j.type = "keepalive";
		this.wsSocket.send(JSON.stringify(j));
	} catch (e) {
	  console.log(e);
	}
}


H5sEvent.prototype.onWebSocketData = function(msg)	
{
	
	if (this._conf.callback != undefined)
	{
		this._conf.callback(msg.data, this._conf.userdata);
	}
} 
	

H5sEvent.prototype.setupWebSocket = function(token)	
{	
	var h5spath = "api/v1/h5seventapi";

	h5spath = this._conf.rootpath + h5spath + '&session=' + this._conf.session;
	
	console.log(h5spath);
	
	this.wsSocket = this.H5SWebSocketClient(h5spath);
	console.log("setupWebSocket", this.wsSocket);
	this.wsSocket.binaryType = 'arraybuffer';
	this.wsSocket.h5 = this;
	this.wsSocket.onmessage = this.onWebSocketData.bind(this);
	
	this.wsSocket.onopen = function()
	{
		console.log("wsSocket.onopen", this.h5);
		
		this.h5.keepaliveTimerId = setInterval(this.h5.keepaliveTimer.bind(this.h5), 1000);

	}
	
	this.wsSocket.onclose = function () {
		console.log("wsSocket.onclose", this.h5);
		if (this.h5.bDisConnected === true)
		{
			console.log("wsSocket.onclose disconnect");
		}else
		{
			this.h5.bNeedReconnect = true;
		}
		
		this.h5.CleanupWebSocket(this.h5);
	}

}


H5sEvent.prototype.CleanupWebSocket = function(h5sPlayer)
{
	console.log('CleanupWebSocket', h5sPlayer);
	clearInterval(h5sPlayer.keepaliveTimerId);
	h5sPlayer.emptyBuffCnt = 0;
	h5sPlayer.lastBuffTime = 0;
	h5sPlayer.buffTimeSameCnt = 0;
}


/** 
 * Connect a websocket Stream to videoElement 
*/
H5sEvent.prototype.connect = function() {
	/* start connect to server */
	this.setupWebSocket(this._token);
	this.reconnectTimerId = setInterval(this.ReconnectFunction.bind(this), 3000);
}


/** 
 * Disconnect a websocket Stream and clear videoElement source
*/
H5sEvent.prototype.disconnect = function() {
	console.log("disconnect", this);
	this.bDisConnected = true;
	clearInterval(this.reconnectTimerId);
	
	if (this.wsSocket != null)
	{
		this.wsSocket.close();
		this.wsSocket = null;
	}
	console.log("disconnect", this);
} 
export {H5sEvent}
