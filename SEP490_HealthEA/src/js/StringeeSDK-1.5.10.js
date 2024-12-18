//https://raw.githubusercontent.com/webrtc/adapter/master/release/adapter.js
// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
// Determines the intersection of local and remote capabilities.
// is action=setLocalDescription with type allowed in signalingState
// SDP helpers.
// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
// The RTCP CNAME used by all peerconnections from the same JS.
// Splits SDP into lines, dealing with both CRLF and LF.
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
// returns the session description.
// returns the individual media sections.
// Returns lines that start with a certain prefix.
// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
// Translates a candidate object into SDP candidate attribute.
// Parses an ice-options line, returns an array of option tags.
// a=ice-options:foo bar
// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
// Generate an a=rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
// Parses an ftmp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
// Parses an RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
// Extracts the MID (RFC 5888) from a media section.
// returns the MID or undefined if no mid line was found.
// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
// Serializes DTLS parameters to SDP.
// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
// Serializes ICE parameters to SDP.
// Parses the SDP media section and returns RTCRtpParameters.
// Generates parts of the SDP media section describing the capabilities /
// parameters.
// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
// parses http://draft.ortc.org/#rtcrtcpparameters*
// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
// Write boilder plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
// Gets the direction from the mediaSection or the sessionpart.
// a very naive interpretation of a valid SDP.
// Expose public methods.
// Shimming starts here.
// Expose public methods.
// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
// Expose public methods.
// Expose public methods.
// Wraps the peerconnection event eventNameToWrap in a function
// which returns the modified event object (or false to prevent
// the event).
// Utility methods.
//var io = io || {};
//CHANGE_ATTRIBUTE: 103,
//		this._callOnEvent('otherdeviceauthen', body);
//
//				call.answeredOnAnotherDevice = true;
//				call.onRemove();//remove call khoi map calls
//	this._remoteSdp = null;
//	this._listCandidates = [];
//		console.log('make call res: ' + JSON.stringify(res));
//		callback.call(thisCall, res);
//		console.log('la call-in++++++++++++++');
//	var body = {callId: this.callId, code: 505};//test reject AArenet
//    console.log('remove call in array ' + this.callId);
//
//StringeeCall.prototype._checkAndSendEventConnected = function () {
//	if (this.isAnswered && this._mediaConnected) {
//		this._callOnEvent('state', {reason: 'Connected', code: StringeeCallState.CONNECTED, sipCode: -1, sipReason: ''});
//	}
//};
//StringeeCall.prototype.sendHold = function (musicOnHold, callback) {
//	var thisCall = this;
//	var body = {callId: this.callId, hold: true, musicOnHold: musicOnHold};
//	this.client._sendMessage(StringeeServiceType.HOLD, body, function (res) {
//		if (callback) {
//			callback.call(thisCall, {r: res.r});
//			return;
//		}
//	});
//};
//
//StringeeCall.prototype.sendUnHold = function (callback) {
//	var thisCall = this;
//	var body = {callId: this.callId, hold: false};
//	this.client._sendMessage(StringeeServiceType.HOLD, body, function (res) {
//		if (callback) {
//			callback.call(thisCall, {r: res.r});
//			return;
//		}
//	});
//};
//===================================================== processors =============================================== ==>
//	console.log('_call SdpCandidate FromServer: ' + deviceId);
//		console.log('sdp from: ' + deviceId);
//		console.log('candidate from: ' + deviceId);
//		call._listCandidates.push(candidate);//luu vao queue
//			console.log('put list candidate: ' + deviceId);
//		if (call._pc && call.isAnswered) {//neu PC da khoi tao va cuoc goi da tra loi
//			call._pc.addIceCandidate(candidate);
//		} else {
//			call._listCandidates.push(candidate);
//		}
//		console.log('_answeredDeviceId: ' + call._answeredDeviceId);
//		call.ended = true;
//		call.isAnswered = true;
//		call._addCandidateFromQueue();
//	console.log('_callStartFromServer: ' + JSON.stringify(body));
//					thisCall._checkAndSendEventConnected();
//				thisCall._addCandidateFromQueue();
//		var newSdp = sdp.sdp.replace("a=sendrecv", "a=inactive");
//		console.log('newSdp: ' + JSON.stringify(newSdp));
//ham xu ly khi nhan dc remote SDP
//		console.log('set luon vi la call-out');
//		remoteSdp = thisCall._remoteSdps.get(thisCall._answeredDeviceId);
//		console.log('setRemoteDescription+++++++++++++++: ' + thisCall._answeredDeviceId);
//		console.log('thisCall._pc======= ' + thisCall._pc);
//		console.log('thisCall._pc remoteSdp ====== ', remoteSdp);
//	console.log(error);
//			console.log(res);
//		thisCall._pc.addTrack(videoTrack, thisCall._localStream);
//	console.log('isUpgradeToVideo: ' + isUpgradeToVideo);
//	if (this.videoResolution) {
//		videoConstraints = {
//			width: {exact: this.videoResolution.width},
//			height: {exact: this.videoResolution.height}
//		};
//	} else {
//		if (isUpgradeToVideo) {
//			videoConstraints = true;
//		} else {
//			videoConstraints = this.isVideoCall;
//		}
//	}
//	console.log('videoConstraints', videoConstraints);
//kiem tra xem da nghe may chua de add candidate
//			console.log('Add all Candidates From Queue ...., connId: ' + this._answeredDeviceId);
//	this._checkAndSendEventConnected();
//	if (thisCall._remoteStream && thisCall._remoteStream.active) {
//		//upgrade len video call
//		var newStream = event.streams[0];
//		newStream.getTracks().forEach(function (track) {
//			//track : MediaStreamTrack : https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack
//			thisCall._remoteStream.addTrack(track);
//		});
//	} else {
//		thisCall._remoteStream = event.streams[0];//MediaStream
//	}
function StringeeHashMap() {
  var e = []
  return (
    (e.size = function () {
      return this.length
    }),
    (e.isEmpty = function () {
      return 0 === this.length
    }),
    (e.containsKey = function (e) {
      e += ''
      for (var t = 0; t < this.length; t++) if (this[t].key === e) return t
      return -1
    }),
    (e.get = function (e) {
      e += ''
      var t = this.containsKey(e)
      if (t > -1) return this[t].value
    }),
    (e.put = function (e, t) {
      if (((e += ''), -1 !== this.containsKey(e))) return this.get(e)
      this.push({ key: e, value: t })
    }),
    (e.allKeys = function () {
      for (var e = [], t = 0; t < this.length; t++) e.push(this[t].key)
      return e
    }),
    (e.allIntKeys = function () {
      for (var e = [], t = 0; t < this.length; t++) e.push(parseInt(this[t].key))
      return e
    }),
    (e.remove = function (e) {
      e += ''
      var t = this.containsKey(e)
      t > -1 && this.splice(t, 1)
    }),
    (e.clear = function () {
      for (var e = this.allKeys(), t = 0; t < e.length; t++) {
        var r = e[t]
        this.remove(r)
      }
    }),
    e
  )
}
function StringeeClient() {
  ;(this.socket = null),
    (this._stringeeServerAddr = 'https://v1.stringee.com:6888'),
    (this._currentRequestId = 1),
    (this._callbacks = new StringeeHashMap()),
    (this.accessToken = ''),
    (this._onMethods = new StringeeHashMap()),
    (this._stringeeCalls = []),
    (this.deviceId = 'web-' + this._genUuid()),
    (this.browserId = localStorage.getItem('stringee_browser_id')),
    this.browserId ||
      ((this.browserId = 'browser-' + this._genUuid()),
      localStorage.setItem('stringee_browser_id', this.browserId)),
    (this.sessionId = 'session-' + this._genUuid())
}
function StringeeCall(e, t, r, n) {
  ;(this.client = e),
    (this.fromNumber = t),
    (this.toNumber = r),
    (this.custom = ''),
    (this.customDataFromYourServer = ''),
    (this.fromAlias = t),
    (this.toAlias = r),
    (this.fromInternal = !0),
    (this.answeredOnAnotherDevice = !1),
    (this.isVideoCall = n),
    (this.isIncomingCall = !1),
    (this.isAnswered = !1),
    (this.isOnHold = !1),
    (this.ended = !1),
    (this.callId = ''),
    (this._iceServers = null),
    (this.toType = ''),
    (this.muted = !1),
    (this.localVideoEnabled = n),
    (this._onMethods = new StringeeHashMap()),
    e._stringeeCalls.push(this),
    (this.videoResolution = null),
    (this._pc = null),
    (this._localStream = null),
    (this._remoteStream = null),
    (this._localSdp = null),
    (this._remoteSdps = new StringeeHashMap()),
    (this._mapListCandidates = new StringeeHashMap()),
    (this._answeredDeviceId = null),
    (this._setRemoteSdpOk = !1),
    (this._mediaConnected = !1)
}
!(function (e) {
  if ('object' == typeof exports && 'undefined' != typeof module) module.exports = e()
  else if ('function' == typeof define && define.amd) define([], e)
  else {
    var t
    ;(t =
      'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
          ? global
          : 'undefined' != typeof self
            ? self
            : this),
      (t.adapter = e())
  }
})(function () {
  return (function e(t, r, n) {
    function i(a, s) {
      if (!r[a]) {
        if (!t[a]) {
          var c = 'function' == typeof require && require
          if (!s && c) return c(a, !0)
          if (o) return o(a, !0)
          var d = new Error("Cannot find module '" + a + "'")
          throw ((d.code = 'MODULE_NOT_FOUND'), d)
        }
        var p = (r[a] = { exports: {} })
        t[a][0].call(
          p.exports,
          function (e) {
            var r = t[a][1][e]
            return i(r || e)
          },
          p,
          p.exports,
          e,
          t,
          r,
          n
        )
      }
      return r[a].exports
    }
    for (var o = 'function' == typeof require && require, a = 0; a < n.length; a++) i(n[a])
    return i
  })(
    {
      1: [
        function (e, t, r) {
          'use strict'
          function n(e) {
            return (
              {
                inboundrtp: 'inbound-rtp',
                outboundrtp: 'outbound-rtp',
                candidatepair: 'candidate-pair',
                localcandidate: 'local-candidate',
                remotecandidate: 'remote-candidate'
              }[e.type] || e.type
            )
          }
          function i(e, t, r, n, i) {
            var o = p.writeRtpDescription(e.kind, t)
            if (
              ((o += p.writeIceParameters(e.iceGatherer.getLocalParameters())),
              (o += p.writeDtlsParameters(
                e.dtlsTransport.getLocalParameters(),
                'offer' === r ? 'actpass' : i || 'active'
              )),
              (o += 'a=mid:' + e.mid + '\r\n'),
              e.rtpSender && e.rtpReceiver
                ? (o += 'a=sendrecv\r\n')
                : e.rtpSender
                  ? (o += 'a=sendonly\r\n')
                  : e.rtpReceiver
                    ? (o += 'a=recvonly\r\n')
                    : (o += 'a=inactive\r\n'),
              e.rtpSender)
            ) {
              var a = e.rtpSender._initialTrackId || e.rtpSender.track.id
              e.rtpSender._initialTrackId = a
              var s = 'msid:' + (n ? n.id : '-') + ' ' + a + '\r\n'
              ;(o += 'a=' + s),
                (o += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' ' + s),
                e.sendEncodingParameters[0].rtx &&
                  ((o += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' ' + s),
                  (o +=
                    'a=ssrc-group:FID ' +
                    e.sendEncodingParameters[0].ssrc +
                    ' ' +
                    e.sendEncodingParameters[0].rtx.ssrc +
                    '\r\n'))
            }
            return (
              (o +=
                'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' cname:' + p.localCName + '\r\n'),
              e.rtpSender &&
                e.sendEncodingParameters[0].rtx &&
                (o +=
                  'a=ssrc:' +
                  e.sendEncodingParameters[0].rtx.ssrc +
                  ' cname:' +
                  p.localCName +
                  '\r\n'),
              o
            )
          }
          function o(e, t) {
            var r = !1
            return (
              (e = JSON.parse(JSON.stringify(e))),
              e.filter(function (e) {
                if (e && (e.urls || e.url)) {
                  var n = e.urls || e.url
                  e.url &&
                    !e.urls &&
                    console.warn('RTCIceServer.url is deprecated! Use urls instead.')
                  var i = 'string' == typeof n
                  return (
                    i && (n = [n]),
                    (n = n.filter(function (e) {
                      return 0 !== e.indexOf('turn:') ||
                        -1 === e.indexOf('transport=udp') ||
                        -1 !== e.indexOf('turn:[') ||
                        r
                        ? 0 === e.indexOf('stun:') &&
                            t >= 14393 &&
                            -1 === e.indexOf('?transport=udp')
                        : ((r = !0), !0)
                    })),
                    delete e.url,
                    (e.urls = i ? n[0] : n),
                    !!n.length
                  )
                }
              })
            )
          }
          function a(e, t) {
            var r = { codecs: [], headerExtensions: [], fecMechanisms: [] },
              n = function (e, t) {
                e = parseInt(e, 10)
                for (var r = 0; r < t.length; r++)
                  if (t[r].payloadType === e || t[r].preferredPayloadType === e) return t[r]
              },
              i = function (e, t, r, i) {
                var o = n(e.parameters.apt, r),
                  a = n(t.parameters.apt, i)
                return o && a && o.name.toLowerCase() === a.name.toLowerCase()
              }
            return (
              e.codecs.forEach(function (n) {
                for (var o = 0; o < t.codecs.length; o++) {
                  var a = t.codecs[o]
                  if (
                    n.name.toLowerCase() === a.name.toLowerCase() &&
                    n.clockRate === a.clockRate
                  ) {
                    if (
                      'rtx' === n.name.toLowerCase() &&
                      n.parameters &&
                      a.parameters.apt &&
                      !i(n, a, e.codecs, t.codecs)
                    )
                      continue
                    ;(a = JSON.parse(JSON.stringify(a))),
                      (a.numChannels = Math.min(n.numChannels, a.numChannels)),
                      r.codecs.push(a),
                      (a.rtcpFeedback = a.rtcpFeedback.filter(function (e) {
                        for (var t = 0; t < n.rtcpFeedback.length; t++)
                          if (
                            n.rtcpFeedback[t].type === e.type &&
                            n.rtcpFeedback[t].parameter === e.parameter
                          )
                            return !0
                        return !1
                      }))
                    break
                  }
                }
              }),
              e.headerExtensions.forEach(function (e) {
                for (var n = 0; n < t.headerExtensions.length; n++) {
                  var i = t.headerExtensions[n]
                  if (e.uri === i.uri) {
                    r.headerExtensions.push(i)
                    break
                  }
                }
              }),
              r
            )
          }
          function s(e, t, r) {
            return (
              -1 !==
              {
                offer: {
                  setLocalDescription: ['stable', 'have-local-offer'],
                  setRemoteDescription: ['stable', 'have-remote-offer']
                },
                answer: {
                  setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
                  setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
                }
              }[t][e].indexOf(r)
            )
          }
          function c(e, t) {
            var r = e.getRemoteCandidates().find(function (e) {
              return (
                t.foundation === e.foundation &&
                t.ip === e.ip &&
                t.port === e.port &&
                t.priority === e.priority &&
                t.protocol === e.protocol &&
                t.type === e.type
              )
            })
            return r || e.addRemoteCandidate(t), !r
          }
          function d(e, t) {
            var r = new Error(t)
            return (
              (r.name = e),
              (r.code = {
                NotSupportedError: 9,
                InvalidStateError: 11,
                InvalidAccessError: 15,
                TypeError: void 0,
                OperationError: void 0
              }[e]),
              r
            )
          }
          var p = e('sdp')
          t.exports = function (e, t) {
            function r(t, r) {
              r.addTrack(t), r.dispatchEvent(new e.MediaStreamTrackEvent('addtrack', { track: t }))
            }
            function l(t, r) {
              r.removeTrack(t),
                r.dispatchEvent(new e.MediaStreamTrackEvent('removetrack', { track: t }))
            }
            function u(t, r, n, i) {
              var o = new Event('track')
              ;(o.track = r),
                (o.receiver = n),
                (o.transceiver = { receiver: n }),
                (o.streams = i),
                e.setTimeout(function () {
                  t._dispatchEvent('track', o)
                })
            }
            var f = function (r) {
              var n = this,
                i = document.createDocumentFragment()
              if (
                (['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function (e) {
                  n[e] = i[e].bind(i)
                }),
                (this.canTrickleIceCandidates = null),
                (this.needNegotiation = !1),
                (this.localStreams = []),
                (this.remoteStreams = []),
                (this._localDescription = null),
                (this._remoteDescription = null),
                (this.signalingState = 'stable'),
                (this.iceConnectionState = 'new'),
                (this.connectionState = 'new'),
                (this.iceGatheringState = 'new'),
                (r = JSON.parse(JSON.stringify(r || {}))),
                (this.usingBundle = 'max-bundle' === r.bundlePolicy),
                'negotiate' === r.rtcpMuxPolicy)
              )
                throw d('NotSupportedError', "rtcpMuxPolicy 'negotiate' is not supported")
              switch ((r.rtcpMuxPolicy || (r.rtcpMuxPolicy = 'require'), r.iceTransportPolicy)) {
                case 'all':
                case 'relay':
                  break
                default:
                  r.iceTransportPolicy = 'all'
              }
              switch (r.bundlePolicy) {
                case 'balanced':
                case 'max-compat':
                case 'max-bundle':
                  break
                default:
                  r.bundlePolicy = 'balanced'
              }
              if (
                ((r.iceServers = o(r.iceServers || [], t)),
                (this._iceGatherers = []),
                r.iceCandidatePoolSize)
              )
                for (var a = r.iceCandidatePoolSize; a > 0; a--)
                  this._iceGatherers.push(
                    new e.RTCIceGatherer({
                      iceServers: r.iceServers,
                      gatherPolicy: r.iceTransportPolicy
                    })
                  )
              else r.iceCandidatePoolSize = 0
              ;(this._config = r),
                (this.transceivers = []),
                (this._sdpSessionId = p.generateSessionId()),
                (this._sdpSessionVersion = 0),
                (this._dtlsRole = void 0),
                (this._isClosed = !1)
            }
            Object.defineProperty(f.prototype, 'localDescription', {
              configurable: !0,
              get: function () {
                return this._localDescription
              }
            }),
              Object.defineProperty(f.prototype, 'remoteDescription', {
                configurable: !0,
                get: function () {
                  return this._remoteDescription
                }
              }),
              (f.prototype.onicecandidate = null),
              (f.prototype.onaddstream = null),
              (f.prototype.ontrack = null),
              (f.prototype.onremovestream = null),
              (f.prototype.onsignalingstatechange = null),
              (f.prototype.oniceconnectionstatechange = null),
              (f.prototype.onconnectionstatechange = null),
              (f.prototype.onicegatheringstatechange = null),
              (f.prototype.onnegotiationneeded = null),
              (f.prototype.ondatachannel = null),
              (f.prototype._dispatchEvent = function (e, t) {
                this._isClosed ||
                  (this.dispatchEvent(t), 'function' == typeof this['on' + e] && this['on' + e](t))
              }),
              (f.prototype._emitGatheringStateChange = function () {
                var e = new Event('icegatheringstatechange')
                this._dispatchEvent('icegatheringstatechange', e)
              }),
              (f.prototype.getConfiguration = function () {
                return this._config
              }),
              (f.prototype.getLocalStreams = function () {
                return this.localStreams
              }),
              (f.prototype.getRemoteStreams = function () {
                return this.remoteStreams
              }),
              (f.prototype._createTransceiver = function (e, t) {
                var r = this.transceivers.length > 0,
                  n = {
                    track: null,
                    iceGatherer: null,
                    iceTransport: null,
                    dtlsTransport: null,
                    localCapabilities: null,
                    remoteCapabilities: null,
                    rtpSender: null,
                    rtpReceiver: null,
                    kind: e,
                    mid: null,
                    sendEncodingParameters: null,
                    recvEncodingParameters: null,
                    stream: null,
                    associatedRemoteMediaStreams: [],
                    wantReceive: !0
                  }
                if (this.usingBundle && r)
                  (n.iceTransport = this.transceivers[0].iceTransport),
                    (n.dtlsTransport = this.transceivers[0].dtlsTransport)
                else {
                  var i = this._createIceAndDtlsTransports()
                  ;(n.iceTransport = i.iceTransport), (n.dtlsTransport = i.dtlsTransport)
                }
                return t || this.transceivers.push(n), n
              }),
              (f.prototype.addTrack = function (t, r) {
                if (this._isClosed)
                  throw d(
                    'InvalidStateError',
                    'Attempted to call addTrack on a closed peerconnection.'
                  )
                if (
                  this.transceivers.find(function (e) {
                    return e.track === t
                  })
                )
                  throw d('InvalidAccessError', 'Track already exists.')
                for (var n, i = 0; i < this.transceivers.length; i++)
                  this.transceivers[i].track ||
                    this.transceivers[i].kind !== t.kind ||
                    (n = this.transceivers[i])
                return (
                  n || (n = this._createTransceiver(t.kind)),
                  this._maybeFireNegotiationNeeded(),
                  -1 === this.localStreams.indexOf(r) && this.localStreams.push(r),
                  (n.track = t),
                  (n.stream = r),
                  (n.rtpSender = new e.RTCRtpSender(t, n.dtlsTransport)),
                  n.rtpSender
                )
              }),
              (f.prototype.addStream = function (e) {
                var r = this
                if (t >= 15025)
                  e.getTracks().forEach(function (t) {
                    r.addTrack(t, e)
                  })
                else {
                  var n = e.clone()
                  e.getTracks().forEach(function (e, t) {
                    var r = n.getTracks()[t]
                    e.addEventListener('enabled', function (e) {
                      r.enabled = e.enabled
                    })
                  }),
                    n.getTracks().forEach(function (e) {
                      r.addTrack(e, n)
                    })
                }
              }),
              (f.prototype.removeTrack = function (t) {
                if (this._isClosed)
                  throw d(
                    'InvalidStateError',
                    'Attempted to call removeTrack on a closed peerconnection.'
                  )
                if (!(t instanceof e.RTCRtpSender))
                  throw new TypeError(
                    'Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.'
                  )
                var r = this.transceivers.find(function (e) {
                  return e.rtpSender === t
                })
                if (!r) throw d('InvalidAccessError', 'Sender was not created by this connection.')
                var n = r.stream
                r.rtpSender.stop(),
                  (r.rtpSender = null),
                  (r.track = null),
                  (r.stream = null),
                  -1 ===
                    this.transceivers
                      .map(function (e) {
                        return e.stream
                      })
                      .indexOf(n) &&
                    this.localStreams.indexOf(n) > -1 &&
                    this.localStreams.splice(this.localStreams.indexOf(n), 1),
                  this._maybeFireNegotiationNeeded()
              }),
              (f.prototype.removeStream = function (e) {
                var t = this
                e.getTracks().forEach(function (e) {
                  var r = t.getSenders().find(function (t) {
                    return t.track === e
                  })
                  r && t.removeTrack(r)
                })
              }),
              (f.prototype.getSenders = function () {
                return this.transceivers
                  .filter(function (e) {
                    return !!e.rtpSender
                  })
                  .map(function (e) {
                    return e.rtpSender
                  })
              }),
              (f.prototype.getReceivers = function () {
                return this.transceivers
                  .filter(function (e) {
                    return !!e.rtpReceiver
                  })
                  .map(function (e) {
                    return e.rtpReceiver
                  })
              }),
              (f.prototype._createIceGatherer = function (t, r) {
                var n = this
                if (r && t > 0) return this.transceivers[0].iceGatherer
                if (this._iceGatherers.length) return this._iceGatherers.shift()
                var i = new e.RTCIceGatherer({
                  iceServers: this._config.iceServers,
                  gatherPolicy: this._config.iceTransportPolicy
                })
                return (
                  Object.defineProperty(i, 'state', { value: 'new', writable: !0 }),
                  (this.transceivers[t].bufferedCandidateEvents = []),
                  (this.transceivers[t].bufferCandidates = function (e) {
                    var r = !e.candidate || 0 === Object.keys(e.candidate).length
                    ;(i.state = r ? 'completed' : 'gathering'),
                      null !== n.transceivers[t].bufferedCandidateEvents &&
                        n.transceivers[t].bufferedCandidateEvents.push(e)
                  }),
                  i.addEventListener('localcandidate', this.transceivers[t].bufferCandidates),
                  i
                )
              }),
              (f.prototype._gather = function (t, r) {
                var n = this,
                  i = this.transceivers[r].iceGatherer
                if (!i.onlocalcandidate) {
                  var o = this.transceivers[r].bufferedCandidateEvents
                  ;(this.transceivers[r].bufferedCandidateEvents = null),
                    i.removeEventListener('localcandidate', this.transceivers[r].bufferCandidates),
                    (i.onlocalcandidate = function (e) {
                      if (!(n.usingBundle && r > 0)) {
                        var o = new Event('icecandidate')
                        o.candidate = { sdpMid: t, sdpMLineIndex: r }
                        var a = e.candidate,
                          s = !a || 0 === Object.keys(a).length
                        if (s)
                          ('new' !== i.state && 'gathering' !== i.state) || (i.state = 'completed')
                        else {
                          'new' === i.state && (i.state = 'gathering'),
                            (a.component = 1),
                            (a.ufrag = i.getLocalParameters().usernameFragment)
                          var c = p.writeCandidate(a)
                          ;(o.candidate = Object.assign(o.candidate, p.parseCandidate(c))),
                            (o.candidate.candidate = c),
                            (o.candidate.toJSON = function () {
                              return {
                                candidate: o.candidate.candidate,
                                sdpMid: o.candidate.sdpMid,
                                sdpMLineIndex: o.candidate.sdpMLineIndex,
                                usernameFragment: o.candidate.usernameFragment
                              }
                            })
                        }
                        var d = p.getMediaSections(n._localDescription.sdp)
                        ;(d[o.candidate.sdpMLineIndex] += s
                          ? 'a=end-of-candidates\r\n'
                          : 'a=' + o.candidate.candidate + '\r\n'),
                          (n._localDescription.sdp =
                            p.getDescription(n._localDescription.sdp) + d.join(''))
                        var l = n.transceivers.every(function (e) {
                          return e.iceGatherer && 'completed' === e.iceGatherer.state
                        })
                        'gathering' !== n.iceGatheringState &&
                          ((n.iceGatheringState = 'gathering'), n._emitGatheringStateChange()),
                          s || n._dispatchEvent('icecandidate', o),
                          l &&
                            (n._dispatchEvent('icecandidate', new Event('icecandidate')),
                            (n.iceGatheringState = 'complete'),
                            n._emitGatheringStateChange())
                      }
                    }),
                    e.setTimeout(function () {
                      o.forEach(function (e) {
                        i.onlocalcandidate(e)
                      })
                    }, 0)
                }
              }),
              (f.prototype._createIceAndDtlsTransports = function () {
                var t = this,
                  r = new e.RTCIceTransport(null)
                r.onicestatechange = function () {
                  t._updateIceConnectionState(), t._updateConnectionState()
                }
                var n = new e.RTCDtlsTransport(r)
                return (
                  (n.ondtlsstatechange = function () {
                    t._updateConnectionState()
                  }),
                  (n.onerror = function () {
                    Object.defineProperty(n, 'state', { value: 'failed', writable: !0 }),
                      t._updateConnectionState()
                  }),
                  { iceTransport: r, dtlsTransport: n }
                )
              }),
              (f.prototype._disposeIceAndDtlsTransports = function (e) {
                var t = this.transceivers[e].iceGatherer
                t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer)
                var r = this.transceivers[e].iceTransport
                r && (delete r.onicestatechange, delete this.transceivers[e].iceTransport)
                var n = this.transceivers[e].dtlsTransport
                n &&
                  (delete n.ondtlsstatechange,
                  delete n.onerror,
                  delete this.transceivers[e].dtlsTransport)
              }),
              (f.prototype._transceive = function (e, r, n) {
                var i = a(e.localCapabilities, e.remoteCapabilities)
                r &&
                  e.rtpSender &&
                  ((i.encodings = e.sendEncodingParameters),
                  (i.rtcp = { cname: p.localCName, compound: e.rtcpParameters.compound }),
                  e.recvEncodingParameters.length &&
                    (i.rtcp.ssrc = e.recvEncodingParameters[0].ssrc),
                  e.rtpSender.send(i)),
                  n &&
                    e.rtpReceiver &&
                    i.codecs.length > 0 &&
                    ('video' === e.kind &&
                      e.recvEncodingParameters &&
                      t < 15019 &&
                      e.recvEncodingParameters.forEach(function (e) {
                        delete e.rtx
                      }),
                    e.recvEncodingParameters.length
                      ? (i.encodings = e.recvEncodingParameters)
                      : (i.encodings = [{}]),
                    (i.rtcp = { compound: e.rtcpParameters.compound }),
                    e.rtcpParameters.cname && (i.rtcp.cname = e.rtcpParameters.cname),
                    e.sendEncodingParameters.length &&
                      (i.rtcp.ssrc = e.sendEncodingParameters[0].ssrc),
                    e.rtpReceiver.receive(i))
              }),
              (f.prototype.setLocalDescription = function (e) {
                var t = this
                if (-1 === ['offer', 'answer'].indexOf(e.type))
                  return Promise.reject(d('TypeError', 'Unsupported type "' + e.type + '"'))
                if (!s('setLocalDescription', e.type, t.signalingState) || t._isClosed)
                  return Promise.reject(
                    d(
                      'InvalidStateError',
                      'Can not set local ' + e.type + ' in state ' + t.signalingState
                    )
                  )
                var r, n
                if ('offer' === e.type)
                  (r = p.splitSections(e.sdp)),
                    (n = r.shift()),
                    r.forEach(function (e, r) {
                      var n = p.parseRtpParameters(e)
                      t.transceivers[r].localCapabilities = n
                    }),
                    t.transceivers.forEach(function (e, r) {
                      t._gather(e.mid, r)
                    })
                else if ('answer' === e.type) {
                  ;(r = p.splitSections(t._remoteDescription.sdp)), (n = r.shift())
                  var i = p.matchPrefix(n, 'a=ice-lite').length > 0
                  r.forEach(function (e, r) {
                    var o = t.transceivers[r],
                      s = o.iceGatherer,
                      c = o.iceTransport,
                      d = o.dtlsTransport,
                      l = o.localCapabilities,
                      u = o.remoteCapabilities
                    if (
                      !(
                        (p.isRejected(e) && 0 === p.matchPrefix(e, 'a=bundle-only').length) ||
                        o.rejected
                      )
                    ) {
                      var f = p.getIceParameters(e, n),
                        v = p.getDtlsParameters(e, n)
                      i && (v.role = 'server'),
                        (t.usingBundle && 0 !== r) ||
                          (t._gather(o.mid, r),
                          'new' === c.state && c.start(s, f, i ? 'controlling' : 'controlled'),
                          'new' === d.state && d.start(v))
                      var h = a(l, u)
                      t._transceive(o, h.codecs.length > 0, !1)
                    }
                  })
                }
                return (
                  (t._localDescription = { type: e.type, sdp: e.sdp }),
                  'offer' === e.type
                    ? t._updateSignalingState('have-local-offer')
                    : t._updateSignalingState('stable'),
                  Promise.resolve()
                )
              }),
              (f.prototype.setRemoteDescription = function (n) {
                var i = this
                if (-1 === ['offer', 'answer'].indexOf(n.type))
                  return Promise.reject(d('TypeError', 'Unsupported type "' + n.type + '"'))
                if (!s('setRemoteDescription', n.type, i.signalingState) || i._isClosed)
                  return Promise.reject(
                    d(
                      'InvalidStateError',
                      'Can not set remote ' + n.type + ' in state ' + i.signalingState
                    )
                  )
                var o = {}
                i.remoteStreams.forEach(function (e) {
                  o[e.id] = e
                })
                var a = [],
                  f = p.splitSections(n.sdp),
                  v = f.shift(),
                  h = p.matchPrefix(v, 'a=ice-lite').length > 0,
                  m = p.matchPrefix(v, 'a=group:BUNDLE ').length > 0
                i.usingBundle = m
                var g = p.matchPrefix(v, 'a=ice-options:')[0]
                return (
                  (i.canTrickleIceCandidates =
                    !!g && g.substr(14).split(' ').indexOf('trickle') >= 0),
                  f.forEach(function (s, d) {
                    var u = p.splitLines(s),
                      f = p.getKind(s),
                      g = p.isRejected(s) && 0 === p.matchPrefix(s, 'a=bundle-only').length,
                      S = u[0].substr(2).split(' ')[2],
                      C = p.getDirection(s, v),
                      y = p.parseMsid(s),
                      T = p.getMid(s) || p.generateIdentifier()
                    if (g || ('application' === f && ('DTLS/SCTP' === S || 'UDP/DTLS/SCTP' === S)))
                      return void (i.transceivers[d] = {
                        mid: T,
                        kind: f,
                        protocol: S,
                        rejected: !0
                      })
                    !g &&
                      i.transceivers[d] &&
                      i.transceivers[d].rejected &&
                      (i.transceivers[d] = i._createTransceiver(f, !0))
                    var _,
                      R,
                      E,
                      P,
                      b,
                      w,
                      k,
                      O,
                      I,
                      D,
                      M,
                      A = p.parseRtpParameters(s)
                    g ||
                      ((D = p.getIceParameters(s, v)),
                      (M = p.getDtlsParameters(s, v)),
                      (M.role = 'client')),
                      (k = p.parseRtpEncodingParameters(s))
                    var L = p.parseRtcpParameters(s),
                      x = p.matchPrefix(s, 'a=end-of-candidates', v).length > 0,
                      N = p
                        .matchPrefix(s, 'a=candidate:')
                        .map(function (e) {
                          return p.parseCandidate(e)
                        })
                        .filter(function (e) {
                          return 1 === e.component
                        })
                    if (
                      (('offer' === n.type || 'answer' === n.type) &&
                        !g &&
                        m &&
                        d > 0 &&
                        i.transceivers[d] &&
                        (i._disposeIceAndDtlsTransports(d),
                        (i.transceivers[d].iceGatherer = i.transceivers[0].iceGatherer),
                        (i.transceivers[d].iceTransport = i.transceivers[0].iceTransport),
                        (i.transceivers[d].dtlsTransport = i.transceivers[0].dtlsTransport),
                        i.transceivers[d].rtpSender &&
                          i.transceivers[d].rtpSender.setTransport(i.transceivers[0].dtlsTransport),
                        i.transceivers[d].rtpReceiver &&
                          i.transceivers[d].rtpReceiver.setTransport(
                            i.transceivers[0].dtlsTransport
                          )),
                      'offer' !== n.type || g)
                    )
                      'answer' !== n.type ||
                        g ||
                        ((_ = i.transceivers[d]),
                        (R = _.iceGatherer),
                        (E = _.iceTransport),
                        (P = _.dtlsTransport),
                        (b = _.rtpReceiver),
                        (w = _.sendEncodingParameters),
                        (O = _.localCapabilities),
                        (i.transceivers[d].recvEncodingParameters = k),
                        (i.transceivers[d].remoteCapabilities = A),
                        (i.transceivers[d].rtcpParameters = L),
                        N.length &&
                          'new' === E.state &&
                          ((!h && !x) || (m && 0 !== d)
                            ? N.forEach(function (e) {
                                c(_.iceTransport, e)
                              })
                            : E.setRemoteCandidates(N)),
                        (m && 0 !== d) ||
                          ('new' === E.state && E.start(R, D, 'controlling'),
                          'new' === P.state && P.start(M)),
                        i._transceive(
                          _,
                          'sendrecv' === C || 'recvonly' === C,
                          'sendrecv' === C || 'sendonly' === C
                        ),
                        !b || ('sendrecv' !== C && 'sendonly' !== C)
                          ? delete _.rtpReceiver
                          : ((I = b.track),
                            y
                              ? (o[y.stream] || (o[y.stream] = new e.MediaStream()),
                                r(I, o[y.stream]),
                                a.push([I, b, o[y.stream]]))
                              : (o.default || (o.default = new e.MediaStream()),
                                r(I, o.default),
                                a.push([I, b, o.default]))))
                    else {
                      ;(_ = i.transceivers[d] || i._createTransceiver(f)),
                        (_.mid = T),
                        _.iceGatherer || (_.iceGatherer = i._createIceGatherer(d, m)),
                        N.length &&
                          'new' === _.iceTransport.state &&
                          (!x || (m && 0 !== d)
                            ? N.forEach(function (e) {
                                c(_.iceTransport, e)
                              })
                            : _.iceTransport.setRemoteCandidates(N)),
                        (O = e.RTCRtpReceiver.getCapabilities(f)),
                        t < 15019 &&
                          (O.codecs = O.codecs.filter(function (e) {
                            return 'rtx' !== e.name
                          })),
                        (w = _.sendEncodingParameters || [{ ssrc: 1001 * (2 * d + 2) }])
                      var j = !1
                      if ('sendrecv' === C || 'sendonly' === C) {
                        if (
                          ((j = !_.rtpReceiver),
                          (b = _.rtpReceiver || new e.RTCRtpReceiver(_.dtlsTransport, f)),
                          j)
                        ) {
                          var U
                          ;(I = b.track),
                            (y && '-' === y.stream) ||
                              (y
                                ? (o[y.stream] ||
                                    ((o[y.stream] = new e.MediaStream()),
                                    Object.defineProperty(o[y.stream], 'id', {
                                      get: function () {
                                        return y.stream
                                      }
                                    })),
                                  Object.defineProperty(I, 'id', {
                                    get: function () {
                                      return y.track
                                    }
                                  }),
                                  (U = o[y.stream]))
                                : (o.default || (o.default = new e.MediaStream()),
                                  (U = o.default))),
                            U && (r(I, U), _.associatedRemoteMediaStreams.push(U)),
                            a.push([I, b, U])
                        }
                      } else
                        _.rtpReceiver &&
                          _.rtpReceiver.track &&
                          (_.associatedRemoteMediaStreams.forEach(function (e) {
                            var t = e.getTracks().find(function (e) {
                              return e.id === _.rtpReceiver.track.id
                            })
                            t && l(t, e)
                          }),
                          (_.associatedRemoteMediaStreams = []))
                      ;(_.localCapabilities = O),
                        (_.remoteCapabilities = A),
                        (_.rtpReceiver = b),
                        (_.rtcpParameters = L),
                        (_.sendEncodingParameters = w),
                        (_.recvEncodingParameters = k),
                        i._transceive(i.transceivers[d], !1, j)
                    }
                  }),
                  void 0 === i._dtlsRole &&
                    (i._dtlsRole = 'offer' === n.type ? 'active' : 'passive'),
                  (i._remoteDescription = { type: n.type, sdp: n.sdp }),
                  'offer' === n.type
                    ? i._updateSignalingState('have-remote-offer')
                    : i._updateSignalingState('stable'),
                  Object.keys(o).forEach(function (t) {
                    var r = o[t]
                    if (r.getTracks().length) {
                      if (-1 === i.remoteStreams.indexOf(r)) {
                        i.remoteStreams.push(r)
                        var n = new Event('addstream')
                        ;(n.stream = r),
                          e.setTimeout(function () {
                            i._dispatchEvent('addstream', n)
                          })
                      }
                      a.forEach(function (e) {
                        var t = e[0],
                          n = e[1]
                        r.id === e[2].id && u(i, t, n, [r])
                      })
                    }
                  }),
                  a.forEach(function (e) {
                    e[2] || u(i, e[0], e[1], [])
                  }),
                  e.setTimeout(function () {
                    i &&
                      i.transceivers &&
                      i.transceivers.forEach(function (e) {
                        e.iceTransport &&
                          'new' === e.iceTransport.state &&
                          e.iceTransport.getRemoteCandidates().length > 0 &&
                          (console.warn(
                            'Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification'
                          ),
                          e.iceTransport.addRemoteCandidate({}))
                      })
                  }, 4e3),
                  Promise.resolve()
                )
              }),
              (f.prototype.close = function () {
                this.transceivers.forEach(function (e) {
                  e.iceTransport && e.iceTransport.stop(),
                    e.dtlsTransport && e.dtlsTransport.stop(),
                    e.rtpSender && e.rtpSender.stop(),
                    e.rtpReceiver && e.rtpReceiver.stop()
                }),
                  (this._isClosed = !0),
                  this._updateSignalingState('closed')
              }),
              (f.prototype._updateSignalingState = function (e) {
                this.signalingState = e
                var t = new Event('signalingstatechange')
                this._dispatchEvent('signalingstatechange', t)
              }),
              (f.prototype._maybeFireNegotiationNeeded = function () {
                var t = this
                'stable' === this.signalingState &&
                  !0 !== this.needNegotiation &&
                  ((this.needNegotiation = !0),
                  e.setTimeout(function () {
                    if (t.needNegotiation) {
                      t.needNegotiation = !1
                      var e = new Event('negotiationneeded')
                      t._dispatchEvent('negotiationneeded', e)
                    }
                  }, 0))
              }),
              (f.prototype._updateIceConnectionState = function () {
                var e,
                  t = {
                    new: 0,
                    closed: 0,
                    checking: 0,
                    connected: 0,
                    completed: 0,
                    disconnected: 0,
                    failed: 0
                  }
                if (
                  (this.transceivers.forEach(function (e) {
                    t[e.iceTransport.state]++
                  }),
                  (e = 'new'),
                  t.failed > 0
                    ? (e = 'failed')
                    : t.checking > 0
                      ? (e = 'checking')
                      : t.disconnected > 0
                        ? (e = 'disconnected')
                        : t.new > 0
                          ? (e = 'new')
                          : t.connected > 0
                            ? (e = 'connected')
                            : t.completed > 0 && (e = 'completed'),
                  e !== this.iceConnectionState)
                ) {
                  this.iceConnectionState = e
                  var r = new Event('iceconnectionstatechange')
                  this._dispatchEvent('iceconnectionstatechange', r)
                }
              }),
              (f.prototype._updateConnectionState = function () {
                var e,
                  t = {
                    new: 0,
                    closed: 0,
                    connecting: 0,
                    connected: 0,
                    completed: 0,
                    disconnected: 0,
                    failed: 0
                  }
                if (
                  (this.transceivers.forEach(function (e) {
                    t[e.iceTransport.state]++, t[e.dtlsTransport.state]++
                  }),
                  (t.connected += t.completed),
                  (e = 'new'),
                  t.failed > 0
                    ? (e = 'failed')
                    : t.connecting > 0
                      ? (e = 'connecting')
                      : t.disconnected > 0
                        ? (e = 'disconnected')
                        : t.new > 0
                          ? (e = 'new')
                          : t.connected > 0 && (e = 'connected'),
                  e !== this.connectionState)
                ) {
                  this.connectionState = e
                  var r = new Event('connectionstatechange')
                  this._dispatchEvent('connectionstatechange', r)
                }
              }),
              (f.prototype.createOffer = function () {
                var r = this
                if (r._isClosed)
                  return Promise.reject(
                    d('InvalidStateError', 'Can not call createOffer after close')
                  )
                var n = r.transceivers.filter(function (e) {
                    return 'audio' === e.kind
                  }).length,
                  o = r.transceivers.filter(function (e) {
                    return 'video' === e.kind
                  }).length,
                  a = arguments[0]
                if (a) {
                  if (a.mandatory || a.optional)
                    throw new TypeError('Legacy mandatory/optional constraints not supported.')
                  void 0 !== a.offerToReceiveAudio &&
                    (n =
                      !0 === a.offerToReceiveAudio
                        ? 1
                        : !1 === a.offerToReceiveAudio
                          ? 0
                          : a.offerToReceiveAudio),
                    void 0 !== a.offerToReceiveVideo &&
                      (o =
                        !0 === a.offerToReceiveVideo
                          ? 1
                          : !1 === a.offerToReceiveVideo
                            ? 0
                            : a.offerToReceiveVideo)
                }
                for (
                  r.transceivers.forEach(function (e) {
                    'audio' === e.kind
                      ? --n < 0 && (e.wantReceive = !1)
                      : 'video' === e.kind && --o < 0 && (e.wantReceive = !1)
                  });
                  n > 0 || o > 0;

                )
                  n > 0 && (r._createTransceiver('audio'), n--),
                    o > 0 && (r._createTransceiver('video'), o--)
                var s = p.writeSessionBoilerplate(r._sdpSessionId, r._sdpSessionVersion++)
                r.transceivers.forEach(function (n, i) {
                  var o = n.track,
                    a = n.kind,
                    s = n.mid || p.generateIdentifier()
                  ;(n.mid = s),
                    n.iceGatherer || (n.iceGatherer = r._createIceGatherer(i, r.usingBundle))
                  var c = e.RTCRtpSender.getCapabilities(a)
                  t < 15019 &&
                    (c.codecs = c.codecs.filter(function (e) {
                      return 'rtx' !== e.name
                    })),
                    c.codecs.forEach(function (e) {
                      'H264' === e.name &&
                        void 0 === e.parameters['level-asymmetry-allowed'] &&
                        (e.parameters['level-asymmetry-allowed'] = '1'),
                        n.remoteCapabilities &&
                          n.remoteCapabilities.codecs &&
                          n.remoteCapabilities.codecs.forEach(function (t) {
                            e.name.toLowerCase() === t.name.toLowerCase() &&
                              e.clockRate === t.clockRate &&
                              (e.preferredPayloadType = t.payloadType)
                          })
                    }),
                    c.headerExtensions.forEach(function (e) {
                      ;(
                        (n.remoteCapabilities && n.remoteCapabilities.headerExtensions) ||
                        []
                      ).forEach(function (t) {
                        e.uri === t.uri && (e.id = t.id)
                      })
                    })
                  var d = n.sendEncodingParameters || [{ ssrc: 1001 * (2 * i + 1) }]
                  o &&
                    t >= 15019 &&
                    'video' === a &&
                    !d[0].rtx &&
                    (d[0].rtx = { ssrc: d[0].ssrc + 1 }),
                    n.wantReceive && (n.rtpReceiver = new e.RTCRtpReceiver(n.dtlsTransport, a)),
                    (n.localCapabilities = c),
                    (n.sendEncodingParameters = d)
                }),
                  'max-compat' !== r._config.bundlePolicy &&
                    (s +=
                      'a=group:BUNDLE ' +
                      r.transceivers
                        .map(function (e) {
                          return e.mid
                        })
                        .join(' ') +
                      '\r\n'),
                  (s += 'a=ice-options:trickle\r\n'),
                  r.transceivers.forEach(function (e, t) {
                    ;(s += i(e, e.localCapabilities, 'offer', e.stream, r._dtlsRole)),
                      (s += 'a=rtcp-rsize\r\n'),
                      !e.iceGatherer ||
                        'new' === r.iceGatheringState ||
                        (0 !== t && r.usingBundle) ||
                        (e.iceGatherer.getLocalCandidates().forEach(function (e) {
                          ;(e.component = 1), (s += 'a=' + p.writeCandidate(e) + '\r\n')
                        }),
                        'completed' === e.iceGatherer.state && (s += 'a=end-of-candidates\r\n'))
                  })
                var c = new e.RTCSessionDescription({ type: 'offer', sdp: s })
                return Promise.resolve(c)
              }),
              (f.prototype.createAnswer = function () {
                var r = this
                if (r._isClosed)
                  return Promise.reject(
                    d('InvalidStateError', 'Can not call createAnswer after close')
                  )
                if (
                  'have-remote-offer' !== r.signalingState &&
                  'have-local-pranswer' !== r.signalingState
                )
                  return Promise.reject(
                    d(
                      'InvalidStateError',
                      'Can not call createAnswer in signalingState ' + r.signalingState
                    )
                  )
                var n = p.writeSessionBoilerplate(r._sdpSessionId, r._sdpSessionVersion++)
                r.usingBundle &&
                  (n +=
                    'a=group:BUNDLE ' +
                    r.transceivers
                      .map(function (e) {
                        return e.mid
                      })
                      .join(' ') +
                    '\r\n')
                var o = p.getMediaSections(r._remoteDescription.sdp).length
                r.transceivers.forEach(function (e, s) {
                  if (!(s + 1 > o)) {
                    if (e.rejected)
                      return (
                        'application' === e.kind
                          ? 'DTLS/SCTP' === e.protocol
                            ? (n += 'm=application 0 DTLS/SCTP 5000\r\n')
                            : (n += 'm=application 0 ' + e.protocol + ' webrtc-datachannel\r\n')
                          : 'audio' === e.kind
                            ? (n += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n')
                            : 'video' === e.kind &&
                              (n +=
                                'm=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n'),
                        void (n += 'c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:' + e.mid + '\r\n')
                      )
                    if (e.stream) {
                      var c
                      'audio' === e.kind
                        ? (c = e.stream.getAudioTracks()[0])
                        : 'video' === e.kind && (c = e.stream.getVideoTracks()[0]),
                        c &&
                          t >= 15019 &&
                          'video' === e.kind &&
                          !e.sendEncodingParameters[0].rtx &&
                          (e.sendEncodingParameters[0].rtx = {
                            ssrc: e.sendEncodingParameters[0].ssrc + 1
                          })
                    }
                    var d = a(e.localCapabilities, e.remoteCapabilities)
                    !d.codecs.filter(function (e) {
                      return 'rtx' === e.name.toLowerCase()
                    }).length &&
                      e.sendEncodingParameters[0].rtx &&
                      delete e.sendEncodingParameters[0].rtx,
                      (n += i(e, d, 'answer', e.stream, r._dtlsRole)),
                      e.rtcpParameters && e.rtcpParameters.reducedSize && (n += 'a=rtcp-rsize\r\n')
                  }
                })
                var s = new e.RTCSessionDescription({ type: 'answer', sdp: n })
                return Promise.resolve(s)
              }),
              (f.prototype.addIceCandidate = function (e) {
                var t,
                  r = this
                return e && void 0 === e.sdpMLineIndex && !e.sdpMid
                  ? Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'))
                  : new Promise(function (n, i) {
                      if (!r._remoteDescription)
                        return i(
                          d(
                            'InvalidStateError',
                            'Can not add ICE candidate without a remote description'
                          )
                        )
                      if (e && '' !== e.candidate) {
                        var o = e.sdpMLineIndex
                        if (e.sdpMid)
                          for (var a = 0; a < r.transceivers.length; a++)
                            if (r.transceivers[a].mid === e.sdpMid) {
                              o = a
                              break
                            }
                        var s = r.transceivers[o]
                        if (!s) return i(d('OperationError', 'Can not add ICE candidate'))
                        if (s.rejected) return n()
                        var l =
                          Object.keys(e.candidate).length > 0 ? p.parseCandidate(e.candidate) : {}
                        if ('tcp' === l.protocol && (0 === l.port || 9 === l.port)) return n()
                        if (l.component && 1 !== l.component) return n()
                        if (
                          (0 === o ||
                            (o > 0 && s.iceTransport !== r.transceivers[0].iceTransport)) &&
                          !c(s.iceTransport, l)
                        )
                          return i(d('OperationError', 'Can not add ICE candidate'))
                        var u = e.candidate.trim()
                        0 === u.indexOf('a=') && (u = u.substr(2)),
                          (t = p.getMediaSections(r._remoteDescription.sdp)),
                          (t[o] += 'a=' + (l.type ? u : 'end-of-candidates') + '\r\n'),
                          (r._remoteDescription.sdp =
                            p.getDescription(r._remoteDescription.sdp) + t.join(''))
                      } else
                        for (
                          var f = 0;
                          f < r.transceivers.length &&
                          (r.transceivers[f].rejected ||
                            (r.transceivers[f].iceTransport.addRemoteCandidate({}),
                            (t = p.getMediaSections(r._remoteDescription.sdp)),
                            (t[f] += 'a=end-of-candidates\r\n'),
                            (r._remoteDescription.sdp =
                              p.getDescription(r._remoteDescription.sdp) + t.join('')),
                            !r.usingBundle));
                          f++
                        );
                      n()
                    })
              }),
              (f.prototype.getStats = function (t) {
                if (t && t instanceof e.MediaStreamTrack) {
                  var r = null
                  if (
                    (this.transceivers.forEach(function (e) {
                      e.rtpSender && e.rtpSender.track === t
                        ? (r = e.rtpSender)
                        : e.rtpReceiver && e.rtpReceiver.track === t && (r = e.rtpReceiver)
                    }),
                    !r)
                  )
                    throw d('InvalidAccessError', 'Invalid selector.')
                  return r.getStats()
                }
                var n = []
                return (
                  this.transceivers.forEach(function (e) {
                    ;[
                      'rtpSender',
                      'rtpReceiver',
                      'iceGatherer',
                      'iceTransport',
                      'dtlsTransport'
                    ].forEach(function (t) {
                      e[t] && n.push(e[t].getStats())
                    })
                  }),
                  Promise.all(n).then(function (e) {
                    var t = new Map()
                    return (
                      e.forEach(function (e) {
                        e.forEach(function (e) {
                          t.set(e.id, e)
                        })
                      }),
                      t
                    )
                  })
                )
              }),
              [
                'RTCRtpSender',
                'RTCRtpReceiver',
                'RTCIceGatherer',
                'RTCIceTransport',
                'RTCDtlsTransport'
              ].forEach(function (t) {
                var r = e[t]
                if (r && r.prototype && r.prototype.getStats) {
                  var i = r.prototype.getStats
                  r.prototype.getStats = function () {
                    return i.apply(this).then(function (e) {
                      var t = new Map()
                      return (
                        Object.keys(e).forEach(function (r) {
                          ;(e[r].type = n(e[r])), t.set(r, e[r])
                        }),
                        t
                      )
                    })
                  }
                }
              })
            var v = ['createOffer', 'createAnswer']
            return (
              v.forEach(function (e) {
                var t = f.prototype[e]
                f.prototype[e] = function () {
                  var e = arguments
                  return 'function' == typeof e[0] || 'function' == typeof e[1]
                    ? t.apply(this, [arguments[2]]).then(
                        function (t) {
                          'function' == typeof e[0] && e[0].apply(null, [t])
                        },
                        function (t) {
                          'function' == typeof e[1] && e[1].apply(null, [t])
                        }
                      )
                    : t.apply(this, arguments)
                }
              }),
              (v = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']),
              v.forEach(function (e) {
                var t = f.prototype[e]
                f.prototype[e] = function () {
                  var e = arguments
                  return 'function' == typeof e[1] || 'function' == typeof e[2]
                    ? t.apply(this, arguments).then(
                        function () {
                          'function' == typeof e[1] && e[1].apply(null)
                        },
                        function (t) {
                          'function' == typeof e[2] && e[2].apply(null, [t])
                        }
                      )
                    : t.apply(this, arguments)
                }
              }),
              ['getStats'].forEach(function (e) {
                var t = f.prototype[e]
                f.prototype[e] = function () {
                  var e = arguments
                  return 'function' == typeof e[1]
                    ? t.apply(this, arguments).then(function () {
                        'function' == typeof e[1] && e[1].apply(null)
                      })
                    : t.apply(this, arguments)
                }
              }),
              f
            )
          }
        },
        { sdp: 2 }
      ],
      2: [
        function (e, t, r) {
          'use strict'
          var n = {}
          ;(n.generateIdentifier = function () {
            return Math.random().toString(36).substr(2, 10)
          }),
            (n.localCName = n.generateIdentifier()),
            (n.splitLines = function (e) {
              return e
                .trim()
                .split('\n')
                .map(function (e) {
                  return e.trim()
                })
            }),
            (n.splitSections = function (e) {
              return e.split('\nm=').map(function (e, t) {
                return (t > 0 ? 'm=' + e : e).trim() + '\r\n'
              })
            }),
            (n.getDescription = function (e) {
              var t = n.splitSections(e)
              return t && t[0]
            }),
            (n.getMediaSections = function (e) {
              var t = n.splitSections(e)
              return t.shift(), t
            }),
            (n.matchPrefix = function (e, t) {
              return n.splitLines(e).filter(function (e) {
                return 0 === e.indexOf(t)
              })
            }),
            (n.parseCandidate = function (e) {
              var t
              t =
                0 === e.indexOf('a=candidate:')
                  ? e.substring(12).split(' ')
                  : e.substring(10).split(' ')
              for (
                var r = {
                    foundation: t[0],
                    component: parseInt(t[1], 10),
                    protocol: t[2].toLowerCase(),
                    priority: parseInt(t[3], 10),
                    ip: t[4],
                    port: parseInt(t[5], 10),
                    type: t[7]
                  },
                  n = 8;
                n < t.length;
                n += 2
              )
                switch (t[n]) {
                  case 'raddr':
                    r.relatedAddress = t[n + 1]
                    break
                  case 'rport':
                    r.relatedPort = parseInt(t[n + 1], 10)
                    break
                  case 'tcptype':
                    r.tcpType = t[n + 1]
                    break
                  case 'ufrag':
                    ;(r.ufrag = t[n + 1]), (r.usernameFragment = t[n + 1])
                    break
                  default:
                    r[t[n]] = t[n + 1]
                }
              return r
            }),
            (n.writeCandidate = function (e) {
              var t = []
              t.push(e.foundation),
                t.push(e.component),
                t.push(e.protocol.toUpperCase()),
                t.push(e.priority),
                t.push(e.ip),
                t.push(e.port)
              var r = e.type
              return (
                t.push('typ'),
                t.push(r),
                'host' !== r &&
                  e.relatedAddress &&
                  e.relatedPort &&
                  (t.push('raddr'),
                  t.push(e.relatedAddress),
                  t.push('rport'),
                  t.push(e.relatedPort)),
                e.tcpType &&
                  'tcp' === e.protocol.toLowerCase() &&
                  (t.push('tcptype'), t.push(e.tcpType)),
                (e.usernameFragment || e.ufrag) &&
                  (t.push('ufrag'), t.push(e.usernameFragment || e.ufrag)),
                'candidate:' + t.join(' ')
              )
            }),
            (n.parseIceOptions = function (e) {
              return e.substr(14).split(' ')
            }),
            (n.parseRtpMap = function (e) {
              var t = e.substr(9).split(' '),
                r = { payloadType: parseInt(t.shift(), 10) }
              return (
                (t = t[0].split('/')),
                (r.name = t[0]),
                (r.clockRate = parseInt(t[1], 10)),
                (r.channels = 3 === t.length ? parseInt(t[2], 10) : 1),
                (r.numChannels = r.channels),
                r
              )
            }),
            (n.writeRtpMap = function (e) {
              var t = e.payloadType
              void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType)
              var r = e.channels || e.numChannels || 1
              return (
                'a=rtpmap:' +
                t +
                ' ' +
                e.name +
                '/' +
                e.clockRate +
                (1 !== r ? '/' + r : '') +
                '\r\n'
              )
            }),
            (n.parseExtmap = function (e) {
              var t = e.substr(9).split(' ')
              return {
                id: parseInt(t[0], 10),
                direction: t[0].indexOf('/') > 0 ? t[0].split('/')[1] : 'sendrecv',
                uri: t[1]
              }
            }),
            (n.writeExtmap = function (e) {
              return (
                'a=extmap:' +
                (e.id || e.preferredId) +
                (e.direction && 'sendrecv' !== e.direction ? '/' + e.direction : '') +
                ' ' +
                e.uri +
                '\r\n'
              )
            }),
            (n.parseFmtp = function (e) {
              for (
                var t, r = {}, n = e.substr(e.indexOf(' ') + 1).split(';'), i = 0;
                i < n.length;
                i++
              )
                (t = n[i].trim().split('=')), (r[t[0].trim()] = t[1])
              return r
            }),
            (n.writeFmtp = function (e) {
              var t = '',
                r = e.payloadType
              if (
                (void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType),
                e.parameters && Object.keys(e.parameters).length)
              ) {
                var n = []
                Object.keys(e.parameters).forEach(function (t) {
                  e.parameters[t] ? n.push(t + '=' + e.parameters[t]) : n.push(t)
                }),
                  (t += 'a=fmtp:' + r + ' ' + n.join(';') + '\r\n')
              }
              return t
            }),
            (n.parseRtcpFb = function (e) {
              var t = e.substr(e.indexOf(' ') + 1).split(' ')
              return { type: t.shift(), parameter: t.join(' ') }
            }),
            (n.writeRtcpFb = function (e) {
              var t = '',
                r = e.payloadType
              return (
                void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType),
                e.rtcpFeedback &&
                  e.rtcpFeedback.length &&
                  e.rtcpFeedback.forEach(function (e) {
                    t +=
                      'a=rtcp-fb:' +
                      r +
                      ' ' +
                      e.type +
                      (e.parameter && e.parameter.length ? ' ' + e.parameter : '') +
                      '\r\n'
                  }),
                t
              )
            }),
            (n.parseSsrcMedia = function (e) {
              var t = e.indexOf(' '),
                r = { ssrc: parseInt(e.substr(7, t - 7), 10) },
                n = e.indexOf(':', t)
              return (
                n > -1
                  ? ((r.attribute = e.substr(t + 1, n - t - 1)), (r.value = e.substr(n + 1)))
                  : (r.attribute = e.substr(t + 1)),
                r
              )
            }),
            (n.parseSsrcGroup = function (e) {
              var t = e.substr(13).split(' ')
              return {
                semantics: t.shift(),
                ssrcs: t.map(function (e) {
                  return parseInt(e, 10)
                })
              }
            }),
            (n.getMid = function (e) {
              var t = n.matchPrefix(e, 'a=mid:')[0]
              if (t) return t.substr(6)
            }),
            (n.parseFingerprint = function (e) {
              var t = e.substr(14).split(' ')
              return { algorithm: t[0].toLowerCase(), value: t[1] }
            }),
            (n.getDtlsParameters = function (e, t) {
              return {
                role: 'auto',
                fingerprints: n.matchPrefix(e + t, 'a=fingerprint:').map(n.parseFingerprint)
              }
            }),
            (n.writeDtlsParameters = function (e, t) {
              var r = 'a=setup:' + t + '\r\n'
              return (
                e.fingerprints.forEach(function (e) {
                  r += 'a=fingerprint:' + e.algorithm + ' ' + e.value + '\r\n'
                }),
                r
              )
            }),
            (n.getIceParameters = function (e, t) {
              var r = n.splitLines(e)
              return (
                (r = r.concat(n.splitLines(t))),
                {
                  usernameFragment: r
                    .filter(function (e) {
                      return 0 === e.indexOf('a=ice-ufrag:')
                    })[0]
                    .substr(12),
                  password: r
                    .filter(function (e) {
                      return 0 === e.indexOf('a=ice-pwd:')
                    })[0]
                    .substr(10)
                }
              )
            }),
            (n.writeIceParameters = function (e) {
              return 'a=ice-ufrag:' + e.usernameFragment + '\r\na=ice-pwd:' + e.password + '\r\n'
            }),
            (n.parseRtpParameters = function (e) {
              for (
                var t = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] },
                  r = n.splitLines(e),
                  i = r[0].split(' '),
                  o = 3;
                o < i.length;
                o++
              ) {
                var a = i[o],
                  s = n.matchPrefix(e, 'a=rtpmap:' + a + ' ')[0]
                if (s) {
                  var c = n.parseRtpMap(s),
                    d = n.matchPrefix(e, 'a=fmtp:' + a + ' ')
                  switch (
                    ((c.parameters = d.length ? n.parseFmtp(d[0]) : {}),
                    (c.rtcpFeedback = n.matchPrefix(e, 'a=rtcp-fb:' + a + ' ').map(n.parseRtcpFb)),
                    t.codecs.push(c),
                    c.name.toUpperCase())
                  ) {
                    case 'RED':
                    case 'ULPFEC':
                      t.fecMechanisms.push(c.name.toUpperCase())
                  }
                }
              }
              return (
                n.matchPrefix(e, 'a=extmap:').forEach(function (e) {
                  t.headerExtensions.push(n.parseExtmap(e))
                }),
                t
              )
            }),
            (n.writeRtpDescription = function (e, t) {
              var r = ''
              ;(r += 'm=' + e + ' '),
                (r += t.codecs.length > 0 ? '9' : '0'),
                (r += ' UDP/TLS/RTP/SAVPF '),
                (r +=
                  t.codecs
                    .map(function (e) {
                      return void 0 !== e.preferredPayloadType
                        ? e.preferredPayloadType
                        : e.payloadType
                    })
                    .join(' ') + '\r\n'),
                (r += 'c=IN IP4 0.0.0.0\r\n'),
                (r += 'a=rtcp:9 IN IP4 0.0.0.0\r\n'),
                t.codecs.forEach(function (e) {
                  ;(r += n.writeRtpMap(e)), (r += n.writeFmtp(e)), (r += n.writeRtcpFb(e))
                })
              var i = 0
              return (
                t.codecs.forEach(function (e) {
                  e.maxptime > i && (i = e.maxptime)
                }),
                i > 0 && (r += 'a=maxptime:' + i + '\r\n'),
                (r += 'a=rtcp-mux\r\n'),
                t.headerExtensions &&
                  t.headerExtensions.forEach(function (e) {
                    r += n.writeExtmap(e)
                  }),
                r
              )
            }),
            (n.parseRtpEncodingParameters = function (e) {
              var t,
                r = [],
                i = n.parseRtpParameters(e),
                o = -1 !== i.fecMechanisms.indexOf('RED'),
                a = -1 !== i.fecMechanisms.indexOf('ULPFEC'),
                s = n
                  .matchPrefix(e, 'a=ssrc:')
                  .map(function (e) {
                    return n.parseSsrcMedia(e)
                  })
                  .filter(function (e) {
                    return 'cname' === e.attribute
                  }),
                c = s.length > 0 && s[0].ssrc,
                d = n.matchPrefix(e, 'a=ssrc-group:FID').map(function (e) {
                  return e
                    .substr(17)
                    .split(' ')
                    .map(function (e) {
                      return parseInt(e, 10)
                    })
                })
              d.length > 0 && d[0].length > 1 && d[0][0] === c && (t = d[0][1]),
                i.codecs.forEach(function (e) {
                  if ('RTX' === e.name.toUpperCase() && e.parameters.apt) {
                    var n = { ssrc: c, codecPayloadType: parseInt(e.parameters.apt, 10) }
                    c && t && (n.rtx = { ssrc: t }),
                      r.push(n),
                      o &&
                        ((n = JSON.parse(JSON.stringify(n))),
                        (n.fec = { ssrc: t, mechanism: a ? 'red+ulpfec' : 'red' }),
                        r.push(n))
                  }
                }),
                0 === r.length && c && r.push({ ssrc: c })
              var p = n.matchPrefix(e, 'b=')
              return (
                p.length &&
                  ((p =
                    0 === p[0].indexOf('b=TIAS:')
                      ? parseInt(p[0].substr(7), 10)
                      : 0 === p[0].indexOf('b=AS:')
                        ? 1e3 * parseInt(p[0].substr(5), 10) * 0.95 - 16e3
                        : void 0),
                  r.forEach(function (e) {
                    e.maxBitrate = p
                  })),
                r
              )
            }),
            (n.parseRtcpParameters = function (e) {
              var t = {},
                r = n
                  .matchPrefix(e, 'a=ssrc:')
                  .map(function (e) {
                    return n.parseSsrcMedia(e)
                  })
                  .filter(function (e) {
                    return 'cname' === e.attribute
                  })[0]
              r && ((t.cname = r.value), (t.ssrc = r.ssrc))
              var i = n.matchPrefix(e, 'a=rtcp-rsize')
              ;(t.reducedSize = i.length > 0), (t.compound = 0 === i.length)
              var o = n.matchPrefix(e, 'a=rtcp-mux')
              return (t.mux = o.length > 0), t
            }),
            (n.parseMsid = function (e) {
              var t,
                r = n.matchPrefix(e, 'a=msid:')
              if (1 === r.length)
                return (t = r[0].substr(7).split(' ')), { stream: t[0], track: t[1] }
              var i = n
                .matchPrefix(e, 'a=ssrc:')
                .map(function (e) {
                  return n.parseSsrcMedia(e)
                })
                .filter(function (e) {
                  return 'msid' === e.attribute
                })
              return i.length > 0
                ? ((t = i[0].value.split(' ')), { stream: t[0], track: t[1] })
                : void 0
            }),
            (n.generateSessionId = function () {
              return Math.random().toString().substr(2, 21)
            }),
            (n.writeSessionBoilerplate = function (e, t) {
              var r = void 0 !== t ? t : 2
              return (
                'v=0\r\no=thisisadapterortc ' +
                (e || n.generateSessionId()) +
                ' ' +
                r +
                ' IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n'
              )
            }),
            (n.writeMediaSection = function (e, t, r, i) {
              var o = n.writeRtpDescription(e.kind, t)
              if (
                ((o += n.writeIceParameters(e.iceGatherer.getLocalParameters())),
                (o += n.writeDtlsParameters(
                  e.dtlsTransport.getLocalParameters(),
                  'offer' === r ? 'actpass' : 'active'
                )),
                (o += 'a=mid:' + e.mid + '\r\n'),
                e.direction
                  ? (o += 'a=' + e.direction + '\r\n')
                  : e.rtpSender && e.rtpReceiver
                    ? (o += 'a=sendrecv\r\n')
                    : e.rtpSender
                      ? (o += 'a=sendonly\r\n')
                      : e.rtpReceiver
                        ? (o += 'a=recvonly\r\n')
                        : (o += 'a=inactive\r\n'),
                e.rtpSender)
              ) {
                var a = 'msid:' + i.id + ' ' + e.rtpSender.track.id + '\r\n'
                ;(o += 'a=' + a),
                  (o += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' ' + a),
                  e.sendEncodingParameters[0].rtx &&
                    ((o += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' ' + a),
                    (o +=
                      'a=ssrc-group:FID ' +
                      e.sendEncodingParameters[0].ssrc +
                      ' ' +
                      e.sendEncodingParameters[0].rtx.ssrc +
                      '\r\n'))
              }
              return (
                (o +=
                  'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' cname:' + n.localCName + '\r\n'),
                e.rtpSender &&
                  e.sendEncodingParameters[0].rtx &&
                  (o +=
                    'a=ssrc:' +
                    e.sendEncodingParameters[0].rtx.ssrc +
                    ' cname:' +
                    n.localCName +
                    '\r\n'),
                o
              )
            }),
            (n.getDirection = function (e, t) {
              for (var r = n.splitLines(e), i = 0; i < r.length; i++)
                switch (r[i]) {
                  case 'a=sendrecv':
                  case 'a=sendonly':
                  case 'a=recvonly':
                  case 'a=inactive':
                    return r[i].substr(2)
                }
              return t ? n.getDirection(t) : 'sendrecv'
            }),
            (n.getKind = function (e) {
              return n.splitLines(e)[0].split(' ')[0].substr(2)
            }),
            (n.isRejected = function (e) {
              return '0' === e.split(' ', 2)[1]
            }),
            (n.parseMLine = function (e) {
              var t = n.splitLines(e),
                r = t[0].substr(2).split(' ')
              return {
                kind: r[0],
                port: parseInt(r[1], 10),
                protocol: r[2],
                fmt: r.slice(3).join(' ')
              }
            }),
            (n.parseOLine = function (e) {
              var t = n.matchPrefix(e, 'o=')[0],
                r = t.substr(2).split(' ')
              return {
                username: r[0],
                sessionId: r[1],
                sessionVersion: parseInt(r[2], 10),
                netType: r[3],
                addressType: r[4],
                address: r[5]
              }
            }),
            (n.isValidSDP = function (e) {
              if ('string' != typeof e || 0 === e.length) return !1
              for (var t = n.splitLines(e), r = 0; r < t.length; r++)
                if (t[r].length < 2 || '=' !== t[r].charAt(1)) return !1
              return !0
            }),
            'object' == typeof t && (t.exports = n)
        },
        {}
      ],
      3: [
        function (e, t, r) {
          ;(function (r) {
            'use strict'
            var n = e('./adapter_factory.js')
            t.exports = n({ window: r.window })
          }).call(
            this,
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                  ? window
                  : {}
          )
        },
        { './adapter_factory.js': 4 }
      ],
      4: [
        function (e, t, r) {
          'use strict'
          var n = e('./utils')
          t.exports = function (t, r) {
            var i = t && t.window,
              o = { shimChrome: !0, shimFirefox: !0, shimEdge: !0, shimSafari: !0 }
            for (var a in r) hasOwnProperty.call(r, a) && (o[a] = r[a])
            var s = n.log,
              c = n.detectBrowser(i),
              d = e('./chrome/chrome_shim') || null,
              p = e('./edge/edge_shim') || null,
              l = e('./firefox/firefox_shim') || null,
              u = e('./safari/safari_shim') || null,
              f = e('./common_shim') || null,
              v = {
                browserDetails: c,
                commonShim: f,
                extractVersion: n.extractVersion,
                disableLog: n.disableLog,
                disableWarnings: n.disableWarnings
              }
            switch (c.browser) {
              case 'chrome':
                if (!d || !d.shimPeerConnection || !o.shimChrome)
                  return s('Chrome shim is not included in this adapter release.'), v
                s('adapter.js shimming chrome.'),
                  (v.browserShim = d),
                  f.shimCreateObjectURL(i),
                  d.shimGetUserMedia(i),
                  d.shimMediaStream(i),
                  d.shimSourceObject(i),
                  d.shimPeerConnection(i),
                  d.shimOnTrack(i),
                  d.shimAddTrackRemoveTrack(i),
                  d.shimGetSendersWithDtmf(i),
                  d.shimSenderReceiverGetStats(i),
                  d.fixNegotiationNeeded(i),
                  f.shimRTCIceCandidate(i),
                  f.shimMaxMessageSize(i),
                  f.shimSendThrowTypeError(i)
                break
              case 'firefox':
                if (!l || !l.shimPeerConnection || !o.shimFirefox)
                  return s('Firefox shim is not included in this adapter release.'), v
                s('adapter.js shimming firefox.'),
                  (v.browserShim = l),
                  f.shimCreateObjectURL(i),
                  l.shimGetUserMedia(i),
                  l.shimSourceObject(i),
                  l.shimPeerConnection(i),
                  l.shimOnTrack(i),
                  l.shimRemoveStream(i),
                  l.shimSenderGetStats(i),
                  l.shimReceiverGetStats(i),
                  l.shimRTCDataChannel(i),
                  f.shimRTCIceCandidate(i),
                  f.shimMaxMessageSize(i),
                  f.shimSendThrowTypeError(i)
                break
              case 'edge':
                if (!p || !p.shimPeerConnection || !o.shimEdge)
                  return s('MS edge shim is not included in this adapter release.'), v
                s('adapter.js shimming edge.'),
                  (v.browserShim = p),
                  f.shimCreateObjectURL(i),
                  p.shimGetUserMedia(i),
                  p.shimPeerConnection(i),
                  p.shimReplaceTrack(i),
                  f.shimMaxMessageSize(i),
                  f.shimSendThrowTypeError(i)
                break
              case 'safari':
                if (!u || !o.shimSafari)
                  return s('Safari shim is not included in this adapter release.'), v
                s('adapter.js shimming safari.'),
                  (v.browserShim = u),
                  f.shimCreateObjectURL(i),
                  u.shimRTCIceServerUrls(i),
                  u.shimCreateOfferLegacy(i),
                  u.shimCallbacksAPI(i),
                  u.shimLocalStreamsAPI(i),
                  u.shimRemoteStreamsAPI(i),
                  u.shimTrackEventTransceiver(i),
                  u.shimGetUserMedia(i),
                  f.shimRTCIceCandidate(i),
                  f.shimMaxMessageSize(i),
                  f.shimSendThrowTypeError(i)
                break
              default:
                s('Unsupported browser!')
            }
            return v
          }
        },
        {
          './chrome/chrome_shim': 5,
          './common_shim': 7,
          './edge/edge_shim': 8,
          './firefox/firefox_shim': 11,
          './safari/safari_shim': 13,
          './utils': 14
        }
      ],
      5: [
        function (e, t, r) {
          'use strict'
          function n(e, t, r) {
            t &&
              !r.has(t.id) &&
              (r.set(t.id, t),
              Object.keys(t).forEach(function (i) {
                i.endsWith('Id')
                  ? n(e, e.get(t[i]), r)
                  : i.endsWith('Ids') &&
                    t[i].forEach(function (t) {
                      n(e, e.get(t), r)
                    })
              }))
          }
          function i(e, t, r) {
            var i = r ? 'outbound-rtp' : 'inbound-rtp',
              o = new Map()
            if (null === t) return o
            var a = []
            return (
              e.forEach(function (e) {
                'track' === e.type && e.trackIdentifier === t.id && a.push(e)
              }),
              a.forEach(function (t) {
                e.forEach(function (r) {
                  r.type === i && r.trackId === t.id && n(e, r, o)
                })
              }),
              o
            )
          }
          var o = e('../utils.js'),
            a = o.log
          t.exports = {
            shimGetUserMedia: e('./getusermedia'),
            shimMediaStream: function (e) {
              e.MediaStream = e.MediaStream || e.webkitMediaStream
            },
            shimOnTrack: function (e) {
              if (
                'object' != typeof e ||
                !e.RTCPeerConnection ||
                'ontrack' in e.RTCPeerConnection.prototype
              )
                'RTCRtpTransceiver' in e ||
                  o.wrapPeerConnectionEvent(e, 'track', function (e) {
                    return e.transceiver || (e.transceiver = { receiver: e.receiver }), e
                  })
              else {
                Object.defineProperty(e.RTCPeerConnection.prototype, 'ontrack', {
                  get: function () {
                    return this._ontrack
                  },
                  set: function (e) {
                    this._ontrack && this.removeEventListener('track', this._ontrack),
                      this.addEventListener('track', (this._ontrack = e))
                  },
                  enumerable: !0,
                  configurable: !0
                })
                var t = e.RTCPeerConnection.prototype.setRemoteDescription
                e.RTCPeerConnection.prototype.setRemoteDescription = function () {
                  var r = this
                  return (
                    r._ontrackpoly ||
                      ((r._ontrackpoly = function (t) {
                        t.stream.addEventListener('addtrack', function (n) {
                          var i
                          i = e.RTCPeerConnection.prototype.getReceivers
                            ? r.getReceivers().find(function (e) {
                                return e.track && e.track.id === n.track.id
                              })
                            : { track: n.track }
                          var o = new Event('track')
                          ;(o.track = n.track),
                            (o.receiver = i),
                            (o.transceiver = { receiver: i }),
                            (o.streams = [t.stream]),
                            r.dispatchEvent(o)
                        }),
                          t.stream.getTracks().forEach(function (n) {
                            var i
                            i = e.RTCPeerConnection.prototype.getReceivers
                              ? r.getReceivers().find(function (e) {
                                  return e.track && e.track.id === n.id
                                })
                              : { track: n }
                            var o = new Event('track')
                            ;(o.track = n),
                              (o.receiver = i),
                              (o.transceiver = { receiver: i }),
                              (o.streams = [t.stream]),
                              r.dispatchEvent(o)
                          })
                      }),
                      r.addEventListener('addstream', r._ontrackpoly)),
                    t.apply(r, arguments)
                  )
                }
              }
            },
            shimGetSendersWithDtmf: function (e) {
              if (
                'object' == typeof e &&
                e.RTCPeerConnection &&
                !('getSenders' in e.RTCPeerConnection.prototype) &&
                'createDTMFSender' in e.RTCPeerConnection.prototype
              ) {
                var t = function (e, t) {
                  return {
                    track: t,
                    get dtmf() {
                      return (
                        void 0 === this._dtmf &&
                          ('audio' === t.kind
                            ? (this._dtmf = e.createDTMFSender(t))
                            : (this._dtmf = null)),
                        this._dtmf
                      )
                    },
                    _pc: e
                  }
                }
                if (!e.RTCPeerConnection.prototype.getSenders) {
                  e.RTCPeerConnection.prototype.getSenders = function () {
                    return (this._senders = this._senders || []), this._senders.slice()
                  }
                  var r = e.RTCPeerConnection.prototype.addTrack
                  e.RTCPeerConnection.prototype.addTrack = function (e, n) {
                    var i = this,
                      o = r.apply(i, arguments)
                    return o || ((o = t(i, e)), i._senders.push(o)), o
                  }
                  var n = e.RTCPeerConnection.prototype.removeTrack
                  e.RTCPeerConnection.prototype.removeTrack = function (e) {
                    var t = this
                    n.apply(t, arguments)
                    var r = t._senders.indexOf(e)
                    ;-1 !== r && t._senders.splice(r, 1)
                  }
                }
                var i = e.RTCPeerConnection.prototype.addStream
                e.RTCPeerConnection.prototype.addStream = function (e) {
                  var r = this
                  ;(r._senders = r._senders || []),
                    i.apply(r, [e]),
                    e.getTracks().forEach(function (e) {
                      r._senders.push(t(r, e))
                    })
                }
                var o = e.RTCPeerConnection.prototype.removeStream
                e.RTCPeerConnection.prototype.removeStream = function (e) {
                  var t = this
                  ;(t._senders = t._senders || []),
                    o.apply(t, [e]),
                    e.getTracks().forEach(function (e) {
                      var r = t._senders.find(function (t) {
                        return t.track === e
                      })
                      r && t._senders.splice(t._senders.indexOf(r), 1)
                    })
                }
              } else if (
                'object' == typeof e &&
                e.RTCPeerConnection &&
                'getSenders' in e.RTCPeerConnection.prototype &&
                'createDTMFSender' in e.RTCPeerConnection.prototype &&
                e.RTCRtpSender &&
                !('dtmf' in e.RTCRtpSender.prototype)
              ) {
                var a = e.RTCPeerConnection.prototype.getSenders
                ;(e.RTCPeerConnection.prototype.getSenders = function () {
                  var e = this,
                    t = a.apply(e, [])
                  return (
                    t.forEach(function (t) {
                      t._pc = e
                    }),
                    t
                  )
                }),
                  Object.defineProperty(e.RTCRtpSender.prototype, 'dtmf', {
                    get: function () {
                      return (
                        void 0 === this._dtmf &&
                          ('audio' === this.track.kind
                            ? (this._dtmf = this._pc.createDTMFSender(this.track))
                            : (this._dtmf = null)),
                        this._dtmf
                      )
                    }
                  })
              }
            },
            shimSenderReceiverGetStats: function (e) {
              if (
                'object' == typeof e &&
                e.RTCPeerConnection &&
                e.RTCRtpSender &&
                e.RTCRtpReceiver
              ) {
                if (!('getStats' in e.RTCRtpSender.prototype)) {
                  var t = e.RTCPeerConnection.prototype.getSenders
                  t &&
                    (e.RTCPeerConnection.prototype.getSenders = function () {
                      var e = this,
                        r = t.apply(e, [])
                      return (
                        r.forEach(function (t) {
                          t._pc = e
                        }),
                        r
                      )
                    })
                  var r = e.RTCPeerConnection.prototype.addTrack
                  r &&
                    (e.RTCPeerConnection.prototype.addTrack = function () {
                      var e = r.apply(this, arguments)
                      return (e._pc = this), e
                    }),
                    (e.RTCRtpSender.prototype.getStats = function () {
                      var e = this
                      return this._pc.getStats().then(function (t) {
                        return i(t, e.track, !0)
                      })
                    })
                }
                if (!('getStats' in e.RTCRtpReceiver.prototype)) {
                  var n = e.RTCPeerConnection.prototype.getReceivers
                  n &&
                    (e.RTCPeerConnection.prototype.getReceivers = function () {
                      var e = this,
                        t = n.apply(e, [])
                      return (
                        t.forEach(function (t) {
                          t._pc = e
                        }),
                        t
                      )
                    }),
                    o.wrapPeerConnectionEvent(e, 'track', function (e) {
                      return (e.receiver._pc = e.srcElement), e
                    }),
                    (e.RTCRtpReceiver.prototype.getStats = function () {
                      var e = this
                      return this._pc.getStats().then(function (t) {
                        return i(t, e.track, !1)
                      })
                    })
                }
                if (
                  'getStats' in e.RTCRtpSender.prototype &&
                  'getStats' in e.RTCRtpReceiver.prototype
                ) {
                  var a = e.RTCPeerConnection.prototype.getStats
                  e.RTCPeerConnection.prototype.getStats = function () {
                    var t = this
                    if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
                      var r,
                        n,
                        i,
                        o = arguments[0]
                      return (
                        t.getSenders().forEach(function (e) {
                          e.track === o && (r ? (i = !0) : (r = e))
                        }),
                        t.getReceivers().forEach(function (e) {
                          return e.track === o && (n ? (i = !0) : (n = e)), e.track === o
                        }),
                        i || (r && n)
                          ? Promise.reject(
                              new DOMException(
                                'There are more than one sender or receiver for the track.',
                                'InvalidAccessError'
                              )
                            )
                          : r
                            ? r.getStats()
                            : n
                              ? n.getStats()
                              : Promise.reject(
                                  new DOMException(
                                    'There is no sender or receiver for the track.',
                                    'InvalidAccessError'
                                  )
                                )
                      )
                    }
                    return a.apply(t, arguments)
                  }
                }
              }
            },
            shimSourceObject: function (e) {
              var t = e && e.URL
              'object' == typeof e &&
                (!e.HTMLMediaElement ||
                  'srcObject' in e.HTMLMediaElement.prototype ||
                  Object.defineProperty(e.HTMLMediaElement.prototype, 'srcObject', {
                    get: function () {
                      return this._srcObject
                    },
                    set: function (e) {
                      var r = this
                      if (((this._srcObject = e), this.src && t.revokeObjectURL(this.src), !e))
                        return void (this.src = '')
                      ;(this.src = t.createObjectURL(e)),
                        e.addEventListener('addtrack', function () {
                          r.src && t.revokeObjectURL(r.src), (r.src = t.createObjectURL(e))
                        }),
                        e.addEventListener('removetrack', function () {
                          r.src && t.revokeObjectURL(r.src), (r.src = t.createObjectURL(e))
                        })
                    }
                  }))
            },
            shimAddTrackRemoveTrackWithNative: function (e) {
              e.RTCPeerConnection.prototype.getLocalStreams = function () {
                var e = this
                return (
                  (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
                  Object.keys(this._shimmedLocalStreams).map(function (t) {
                    return e._shimmedLocalStreams[t][0]
                  })
                )
              }
              var t = e.RTCPeerConnection.prototype.addTrack
              e.RTCPeerConnection.prototype.addTrack = function (e, r) {
                if (!r) return t.apply(this, arguments)
                this._shimmedLocalStreams = this._shimmedLocalStreams || {}
                var n = t.apply(this, arguments)
                return (
                  this._shimmedLocalStreams[r.id]
                    ? -1 === this._shimmedLocalStreams[r.id].indexOf(n) &&
                      this._shimmedLocalStreams[r.id].push(n)
                    : (this._shimmedLocalStreams[r.id] = [r, n]),
                  n
                )
              }
              var r = e.RTCPeerConnection.prototype.addStream
              e.RTCPeerConnection.prototype.addStream = function (e) {
                var t = this
                ;(this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
                  e.getTracks().forEach(function (e) {
                    if (
                      t.getSenders().find(function (t) {
                        return t.track === e
                      })
                    )
                      throw new DOMException('Track already exists.', 'InvalidAccessError')
                  })
                var n = t.getSenders()
                r.apply(this, arguments)
                var i = t.getSenders().filter(function (e) {
                  return -1 === n.indexOf(e)
                })
                this._shimmedLocalStreams[e.id] = [e].concat(i)
              }
              var n = e.RTCPeerConnection.prototype.removeStream
              e.RTCPeerConnection.prototype.removeStream = function (e) {
                return (
                  (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
                  delete this._shimmedLocalStreams[e.id],
                  n.apply(this, arguments)
                )
              }
              var i = e.RTCPeerConnection.prototype.removeTrack
              e.RTCPeerConnection.prototype.removeTrack = function (e) {
                var t = this
                return (
                  (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
                  e &&
                    Object.keys(this._shimmedLocalStreams).forEach(function (r) {
                      var n = t._shimmedLocalStreams[r].indexOf(e)
                      ;-1 !== n && t._shimmedLocalStreams[r].splice(n, 1),
                        1 === t._shimmedLocalStreams[r].length && delete t._shimmedLocalStreams[r]
                    }),
                  i.apply(this, arguments)
                )
              }
            },
            shimAddTrackRemoveTrack: function (e) {
              function t(e, t) {
                var r = t.sdp
                return (
                  Object.keys(e._reverseStreams || []).forEach(function (t) {
                    var n = e._reverseStreams[t],
                      i = e._streams[n.id]
                    r = r.replace(new RegExp(i.id, 'g'), n.id)
                  }),
                  new RTCSessionDescription({ type: t.type, sdp: r })
                )
              }
              function r(e, t) {
                var r = t.sdp
                return (
                  Object.keys(e._reverseStreams || []).forEach(function (t) {
                    var n = e._reverseStreams[t],
                      i = e._streams[n.id]
                    r = r.replace(new RegExp(n.id, 'g'), i.id)
                  }),
                  new RTCSessionDescription({ type: t.type, sdp: r })
                )
              }
              var n = o.detectBrowser(e)
              if (e.RTCPeerConnection.prototype.addTrack && n.version >= 65)
                return this.shimAddTrackRemoveTrackWithNative(e)
              var i = e.RTCPeerConnection.prototype.getLocalStreams
              e.RTCPeerConnection.prototype.getLocalStreams = function () {
                var e = this,
                  t = i.apply(this)
                return (
                  (e._reverseStreams = e._reverseStreams || {}),
                  t.map(function (t) {
                    return e._reverseStreams[t.id]
                  })
                )
              }
              var a = e.RTCPeerConnection.prototype.addStream
              e.RTCPeerConnection.prototype.addStream = function (t) {
                var r = this
                if (
                  ((r._streams = r._streams || {}),
                  (r._reverseStreams = r._reverseStreams || {}),
                  t.getTracks().forEach(function (e) {
                    if (
                      r.getSenders().find(function (t) {
                        return t.track === e
                      })
                    )
                      throw new DOMException('Track already exists.', 'InvalidAccessError')
                  }),
                  !r._reverseStreams[t.id])
                ) {
                  var n = new e.MediaStream(t.getTracks())
                  ;(r._streams[t.id] = n), (r._reverseStreams[n.id] = t), (t = n)
                }
                a.apply(r, [t])
              }
              var s = e.RTCPeerConnection.prototype.removeStream
              ;(e.RTCPeerConnection.prototype.removeStream = function (e) {
                var t = this
                ;(t._streams = t._streams || {}),
                  (t._reverseStreams = t._reverseStreams || {}),
                  s.apply(t, [t._streams[e.id] || e]),
                  delete t._reverseStreams[t._streams[e.id] ? t._streams[e.id].id : e.id],
                  delete t._streams[e.id]
              }),
                (e.RTCPeerConnection.prototype.addTrack = function (t, r) {
                  var n = this
                  if ('closed' === n.signalingState)
                    throw new DOMException(
                      "The RTCPeerConnection's signalingState is 'closed'.",
                      'InvalidStateError'
                    )
                  var i = [].slice.call(arguments, 1)
                  if (
                    1 !== i.length ||
                    !i[0].getTracks().find(function (e) {
                      return e === t
                    })
                  )
                    throw new DOMException(
                      'The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.',
                      'NotSupportedError'
                    )
                  if (
                    n.getSenders().find(function (e) {
                      return e.track === t
                    })
                  )
                    throw new DOMException('Track already exists.', 'InvalidAccessError')
                  ;(n._streams = n._streams || {}), (n._reverseStreams = n._reverseStreams || {})
                  var o = n._streams[r.id]
                  if (o)
                    o.addTrack(t),
                      Promise.resolve().then(function () {
                        n.dispatchEvent(new Event('negotiationneeded'))
                      })
                  else {
                    var a = new e.MediaStream([t])
                    ;(n._streams[r.id] = a), (n._reverseStreams[a.id] = r), n.addStream(a)
                  }
                  return n.getSenders().find(function (e) {
                    return e.track === t
                  })
                }),
                ['createOffer', 'createAnswer'].forEach(function (r) {
                  var n = e.RTCPeerConnection.prototype[r]
                  e.RTCPeerConnection.prototype[r] = function () {
                    var e = this,
                      r = arguments
                    return arguments.length && 'function' == typeof arguments[0]
                      ? n.apply(e, [
                          function (n) {
                            var i = t(e, n)
                            r[0].apply(null, [i])
                          },
                          function (e) {
                            r[1] && r[1].apply(null, e)
                          },
                          arguments[2]
                        ])
                      : n.apply(e, arguments).then(function (r) {
                          return t(e, r)
                        })
                  }
                })
              var c = e.RTCPeerConnection.prototype.setLocalDescription
              e.RTCPeerConnection.prototype.setLocalDescription = function () {
                var e = this
                return arguments.length && arguments[0].type
                  ? ((arguments[0] = r(e, arguments[0])), c.apply(e, arguments))
                  : c.apply(e, arguments)
              }
              var d = Object.getOwnPropertyDescriptor(
                e.RTCPeerConnection.prototype,
                'localDescription'
              )
              Object.defineProperty(e.RTCPeerConnection.prototype, 'localDescription', {
                get: function () {
                  var e = this,
                    r = d.get.apply(this)
                  return '' === r.type ? r : t(e, r)
                }
              }),
                (e.RTCPeerConnection.prototype.removeTrack = function (e) {
                  var t = this
                  if ('closed' === t.signalingState)
                    throw new DOMException(
                      "The RTCPeerConnection's signalingState is 'closed'.",
                      'InvalidStateError'
                    )
                  if (!e._pc)
                    throw new DOMException(
                      'Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.',
                      'TypeError'
                    )
                  if (e._pc !== t)
                    throw new DOMException(
                      'Sender was not created by this connection.',
                      'InvalidAccessError'
                    )
                  t._streams = t._streams || {}
                  var r
                  Object.keys(t._streams).forEach(function (n) {
                    t._streams[n].getTracks().find(function (t) {
                      return e.track === t
                    }) && (r = t._streams[n])
                  }),
                    r &&
                      (1 === r.getTracks().length
                        ? t.removeStream(t._reverseStreams[r.id])
                        : r.removeTrack(e.track),
                      t.dispatchEvent(new Event('negotiationneeded')))
                })
            },
            shimPeerConnection: function (e) {
              var t = o.detectBrowser(e)
              if (!e.RTCPeerConnection && e.webkitRTCPeerConnection)
                (e.RTCPeerConnection = function (t, r) {
                  return (
                    a('PeerConnection'),
                    t && t.iceTransportPolicy && (t.iceTransports = t.iceTransportPolicy),
                    new e.webkitRTCPeerConnection(t, r)
                  )
                }),
                  (e.RTCPeerConnection.prototype = e.webkitRTCPeerConnection.prototype),
                  e.webkitRTCPeerConnection.generateCertificate &&
                    Object.defineProperty(e.RTCPeerConnection, 'generateCertificate', {
                      get: function () {
                        return e.webkitRTCPeerConnection.generateCertificate
                      }
                    })
              else {
                var r = e.RTCPeerConnection
                ;(e.RTCPeerConnection = function (e, t) {
                  if (e && e.iceServers) {
                    for (var n = [], i = 0; i < e.iceServers.length; i++) {
                      var a = e.iceServers[i]
                      !a.hasOwnProperty('urls') && a.hasOwnProperty('url')
                        ? (o.deprecated('RTCIceServer.url', 'RTCIceServer.urls'),
                          (a = JSON.parse(JSON.stringify(a))),
                          (a.urls = a.url),
                          n.push(a))
                        : n.push(e.iceServers[i])
                    }
                    e.iceServers = n
                  }
                  return new r(e, t)
                }),
                  (e.RTCPeerConnection.prototype = r.prototype),
                  Object.defineProperty(e.RTCPeerConnection, 'generateCertificate', {
                    get: function () {
                      return r.generateCertificate
                    }
                  })
              }
              var n = e.RTCPeerConnection.prototype.getStats
              ;(e.RTCPeerConnection.prototype.getStats = function (e, t, r) {
                var i = this,
                  o = arguments
                if (arguments.length > 0 && 'function' == typeof e) return n.apply(this, arguments)
                if (0 === n.length && (0 === arguments.length || 'function' != typeof arguments[0]))
                  return n.apply(this, [])
                var a = function (e) {
                    var t = {}
                    return (
                      e.result().forEach(function (e) {
                        var r = {
                          id: e.id,
                          timestamp: e.timestamp,
                          type:
                            {
                              localcandidate: 'local-candidate',
                              remotecandidate: 'remote-candidate'
                            }[e.type] || e.type
                        }
                        e.names().forEach(function (t) {
                          r[t] = e.stat(t)
                        }),
                          (t[r.id] = r)
                      }),
                      t
                    )
                  },
                  s = function (e) {
                    return new Map(
                      Object.keys(e).map(function (t) {
                        return [t, e[t]]
                      })
                    )
                  }
                if (arguments.length >= 2) {
                  var c = function (e) {
                    o[1](s(a(e)))
                  }
                  return n.apply(this, [c, arguments[0]])
                }
                return new Promise(function (e, t) {
                  n.apply(i, [
                    function (t) {
                      e(s(a(t)))
                    },
                    t
                  ])
                }).then(t, r)
              }),
                t.version < 51 &&
                  ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(
                    function (t) {
                      var r = e.RTCPeerConnection.prototype[t]
                      e.RTCPeerConnection.prototype[t] = function () {
                        var e = arguments,
                          t = this,
                          n = new Promise(function (n, i) {
                            r.apply(t, [e[0], n, i])
                          })
                        return e.length < 2
                          ? n
                          : n.then(
                              function () {
                                e[1].apply(null, [])
                              },
                              function (t) {
                                e.length >= 3 && e[2].apply(null, [t])
                              }
                            )
                      }
                    }
                  ),
                t.version < 52 &&
                  ['createOffer', 'createAnswer'].forEach(function (t) {
                    var r = e.RTCPeerConnection.prototype[t]
                    e.RTCPeerConnection.prototype[t] = function () {
                      var e = this
                      if (
                        arguments.length < 1 ||
                        (1 === arguments.length && 'object' == typeof arguments[0])
                      ) {
                        var t = 1 === arguments.length ? arguments[0] : void 0
                        return new Promise(function (n, i) {
                          r.apply(e, [n, i, t])
                        })
                      }
                      return r.apply(this, arguments)
                    }
                  }),
                ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(
                  function (t) {
                    var r = e.RTCPeerConnection.prototype[t]
                    e.RTCPeerConnection.prototype[t] = function () {
                      return (
                        (arguments[0] = new (
                          'addIceCandidate' === t ? e.RTCIceCandidate : e.RTCSessionDescription
                        )(arguments[0])),
                        r.apply(this, arguments)
                      )
                    }
                  }
                )
              var i = e.RTCPeerConnection.prototype.addIceCandidate
              e.RTCPeerConnection.prototype.addIceCandidate = function () {
                return arguments[0]
                  ? i.apply(this, arguments)
                  : (arguments[1] && arguments[1].apply(null), Promise.resolve())
              }
            },
            fixNegotiationNeeded: function (e) {
              o.wrapPeerConnectionEvent(e, 'negotiationneeded', function (e) {
                if ('stable' === e.target.signalingState) return e
              })
            },
            shimGetDisplayMedia: function (e, t) {
              if (!('getDisplayMedia' in e.navigator))
                return 'function' != typeof t
                  ? void console.error(
                      'shimGetDisplayMedia: getSourceId argument is not a function'
                    )
                  : void (navigator.getDisplayMedia = function (e) {
                      return t(e).then(function (t) {
                        return (
                          (e.video = {
                            mandatory: {
                              chromeMediaSource: 'desktop',
                              chromeMediaSourceId: t,
                              maxFrameRate: e.video.frameRate || 3
                            }
                          }),
                          navigator.mediaDevices.getUserMedia(e)
                        )
                      })
                    })
            }
          }
        },
        { '../utils.js': 14, './getusermedia': 6 }
      ],
      6: [
        function (e, t, r) {
          'use strict'
          var n = e('../utils.js'),
            i = n.log
          t.exports = function (e) {
            var t = n.detectBrowser(e),
              r = e && e.navigator,
              o = function (e) {
                if ('object' != typeof e || e.mandatory || e.optional) return e
                var t = {}
                return (
                  Object.keys(e).forEach(function (r) {
                    if ('require' !== r && 'advanced' !== r && 'mediaSource' !== r) {
                      var n = 'object' == typeof e[r] ? e[r] : { ideal: e[r] }
                      void 0 !== n.exact && 'number' == typeof n.exact && (n.min = n.max = n.exact)
                      var i = function (e, t) {
                        return e
                          ? e + t.charAt(0).toUpperCase() + t.slice(1)
                          : 'deviceId' === t
                            ? 'sourceId'
                            : t
                      }
                      if (void 0 !== n.ideal) {
                        t.optional = t.optional || []
                        var o = {}
                        'number' == typeof n.ideal
                          ? ((o[i('min', r)] = n.ideal),
                            t.optional.push(o),
                            (o = {}),
                            (o[i('max', r)] = n.ideal),
                            t.optional.push(o))
                          : ((o[i('', r)] = n.ideal), t.optional.push(o))
                      }
                      void 0 !== n.exact && 'number' != typeof n.exact
                        ? ((t.mandatory = t.mandatory || {}), (t.mandatory[i('', r)] = n.exact))
                        : ['min', 'max'].forEach(function (e) {
                            void 0 !== n[e] &&
                              ((t.mandatory = t.mandatory || {}), (t.mandatory[i(e, r)] = n[e]))
                          })
                    }
                  }),
                  e.advanced && (t.optional = (t.optional || []).concat(e.advanced)),
                  t
                )
              },
              a = function (e, n) {
                if (t.version >= 61) return n(e)
                if ((e = JSON.parse(JSON.stringify(e))) && 'object' == typeof e.audio) {
                  var a = function (e, t, r) {
                    t in e && !(r in e) && ((e[r] = e[t]), delete e[t])
                  }
                  ;(e = JSON.parse(JSON.stringify(e))),
                    a(e.audio, 'autoGainControl', 'googAutoGainControl'),
                    a(e.audio, 'noiseSuppression', 'googNoiseSuppression'),
                    (e.audio = o(e.audio))
                }
                if (e && 'object' == typeof e.video) {
                  var s = e.video.facingMode
                  s = s && ('object' == typeof s ? s : { ideal: s })
                  var c = t.version < 66
                  if (
                    s &&
                    ('user' === s.exact ||
                      'environment' === s.exact ||
                      'user' === s.ideal ||
                      'environment' === s.ideal) &&
                    (!r.mediaDevices.getSupportedConstraints ||
                      !r.mediaDevices.getSupportedConstraints().facingMode ||
                      c)
                  ) {
                    delete e.video.facingMode
                    var d
                    if (
                      ('environment' === s.exact || 'environment' === s.ideal
                        ? (d = ['back', 'rear'])
                        : ('user' !== s.exact && 'user' !== s.ideal) || (d = ['front']),
                      d)
                    )
                      return r.mediaDevices.enumerateDevices().then(function (t) {
                        t = t.filter(function (e) {
                          return 'videoinput' === e.kind
                        })
                        var r = t.find(function (e) {
                          return d.some(function (t) {
                            return -1 !== e.label.toLowerCase().indexOf(t)
                          })
                        })
                        return (
                          !r && t.length && -1 !== d.indexOf('back') && (r = t[t.length - 1]),
                          r &&
                            (e.video.deviceId = s.exact
                              ? { exact: r.deviceId }
                              : { ideal: r.deviceId }),
                          (e.video = o(e.video)),
                          i('chrome: ' + JSON.stringify(e)),
                          n(e)
                        )
                      })
                  }
                  e.video = o(e.video)
                }
                return i('chrome: ' + JSON.stringify(e)), n(e)
              },
              s = function (e) {
                return t.version >= 64
                  ? e
                  : {
                      name:
                        {
                          PermissionDeniedError: 'NotAllowedError',
                          PermissionDismissedError: 'NotAllowedError',
                          InvalidStateError: 'NotAllowedError',
                          DevicesNotFoundError: 'NotFoundError',
                          ConstraintNotSatisfiedError: 'OverconstrainedError',
                          TrackStartError: 'NotReadableError',
                          MediaDeviceFailedDueToShutdown: 'NotAllowedError',
                          MediaDeviceKillSwitchOn: 'NotAllowedError',
                          TabCaptureError: 'AbortError',
                          ScreenCaptureError: 'AbortError',
                          DeviceCaptureError: 'AbortError'
                        }[e.name] || e.name,
                      message: e.message,
                      constraint: e.constraint || e.constraintName,
                      toString: function () {
                        return this.name + (this.message && ': ') + this.message
                      }
                    }
              },
              c = function (e, t, n) {
                a(e, function (e) {
                  r.webkitGetUserMedia(e, t, function (e) {
                    n && n(s(e))
                  })
                })
              }
            r.getUserMedia = c
            var d = function (e) {
              return new Promise(function (t, n) {
                r.getUserMedia(e, t, n)
              })
            }
            if (
              (r.mediaDevices ||
                (r.mediaDevices = {
                  getUserMedia: d,
                  enumerateDevices: function () {
                    return new Promise(function (t) {
                      var r = { audio: 'audioinput', video: 'videoinput' }
                      return e.MediaStreamTrack.getSources(function (e) {
                        t(
                          e.map(function (e) {
                            return { label: e.label, kind: r[e.kind], deviceId: e.id, groupId: '' }
                          })
                        )
                      })
                    })
                  },
                  getSupportedConstraints: function () {
                    return {
                      deviceId: !0,
                      echoCancellation: !0,
                      facingMode: !0,
                      frameRate: !0,
                      height: !0,
                      width: !0
                    }
                  }
                }),
              r.mediaDevices.getUserMedia)
            ) {
              var p = r.mediaDevices.getUserMedia.bind(r.mediaDevices)
              r.mediaDevices.getUserMedia = function (e) {
                return a(e, function (e) {
                  return p(e).then(
                    function (t) {
                      if (
                        (e.audio && !t.getAudioTracks().length) ||
                        (e.video && !t.getVideoTracks().length)
                      )
                        throw (
                          (t.getTracks().forEach(function (e) {
                            e.stop()
                          }),
                          new DOMException('', 'NotFoundError'))
                        )
                      return t
                    },
                    function (e) {
                      return Promise.reject(s(e))
                    }
                  )
                })
              }
            } else
              r.mediaDevices.getUserMedia = function (e) {
                return d(e)
              }
            void 0 === r.mediaDevices.addEventListener &&
              (r.mediaDevices.addEventListener = function () {
                i('Dummy mediaDevices.addEventListener called.')
              }),
              void 0 === r.mediaDevices.removeEventListener &&
                (r.mediaDevices.removeEventListener = function () {
                  i('Dummy mediaDevices.removeEventListener called.')
                })
          }
        },
        { '../utils.js': 14 }
      ],
      7: [
        function (e, t, r) {
          'use strict'
          var n = e('sdp'),
            i = e('./utils')
          t.exports = {
            shimRTCIceCandidate: function (e) {
              if (
                e.RTCIceCandidate &&
                !(e.RTCIceCandidate && 'foundation' in e.RTCIceCandidate.prototype)
              ) {
                var t = e.RTCIceCandidate
                ;(e.RTCIceCandidate = function (e) {
                  if (
                    ('object' == typeof e &&
                      e.candidate &&
                      0 === e.candidate.indexOf('a=') &&
                      ((e = JSON.parse(JSON.stringify(e))), (e.candidate = e.candidate.substr(2))),
                    e.candidate && e.candidate.length)
                  ) {
                    var r = new t(e),
                      i = n.parseCandidate(e.candidate),
                      o = Object.assign(r, i)
                    return (
                      (o.toJSON = function () {
                        return {
                          candidate: o.candidate,
                          sdpMid: o.sdpMid,
                          sdpMLineIndex: o.sdpMLineIndex,
                          usernameFragment: o.usernameFragment
                        }
                      }),
                      o
                    )
                  }
                  return new t(e)
                }),
                  (e.RTCIceCandidate.prototype = t.prototype),
                  i.wrapPeerConnectionEvent(e, 'icecandidate', function (t) {
                    return (
                      t.candidate &&
                        Object.defineProperty(t, 'candidate', {
                          value: new e.RTCIceCandidate(t.candidate),
                          writable: 'false'
                        }),
                      t
                    )
                  })
              }
            },
            shimCreateObjectURL: function (e) {
              var t = e && e.URL
              if (
                'object' == typeof e &&
                e.HTMLMediaElement &&
                'srcObject' in e.HTMLMediaElement.prototype &&
                t.createObjectURL &&
                t.revokeObjectURL
              ) {
                var r = t.createObjectURL.bind(t),
                  n = t.revokeObjectURL.bind(t),
                  o = new Map(),
                  a = 0
                ;(t.createObjectURL = function (e) {
                  if ('getTracks' in e) {
                    var t = 'polyblob:' + ++a
                    return (
                      o.set(t, e),
                      i.deprecated('URL.createObjectURL(stream)', 'elem.srcObject = stream'),
                      t
                    )
                  }
                  return r(e)
                }),
                  (t.revokeObjectURL = function (e) {
                    n(e), o.delete(e)
                  })
                var s = Object.getOwnPropertyDescriptor(e.HTMLMediaElement.prototype, 'src')
                Object.defineProperty(e.HTMLMediaElement.prototype, 'src', {
                  get: function () {
                    return s.get.apply(this)
                  },
                  set: function (e) {
                    return (this.srcObject = o.get(e) || null), s.set.apply(this, [e])
                  }
                })
                var c = e.HTMLMediaElement.prototype.setAttribute
                e.HTMLMediaElement.prototype.setAttribute = function () {
                  return (
                    2 === arguments.length &&
                      'src' === ('' + arguments[0]).toLowerCase() &&
                      (this.srcObject = o.get(arguments[1]) || null),
                    c.apply(this, arguments)
                  )
                }
              }
            },
            shimMaxMessageSize: function (e) {
              if (!e.RTCSctpTransport && e.RTCPeerConnection) {
                var t = i.detectBrowser(e)
                'sctp' in e.RTCPeerConnection.prototype ||
                  Object.defineProperty(e.RTCPeerConnection.prototype, 'sctp', {
                    get: function () {
                      return void 0 === this._sctp ? null : this._sctp
                    }
                  })
                var r = function (e) {
                    var t = n.splitSections(e.sdp)
                    return (
                      t.shift(),
                      t.some(function (e) {
                        var t = n.parseMLine(e)
                        return t && 'application' === t.kind && -1 !== t.protocol.indexOf('SCTP')
                      })
                    )
                  },
                  o = function (e) {
                    var t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/)
                    if (null === t || t.length < 2) return -1
                    var r = parseInt(t[1], 10)
                    return r !== r ? -1 : r
                  },
                  a = function (e) {
                    var r = 65536
                    return (
                      'firefox' === t.browser &&
                        (r =
                          t.version < 57
                            ? -1 === e
                              ? 16384
                              : 2147483637
                            : t.version < 60
                              ? 57 === t.version
                                ? 65535
                                : 65536
                              : 2147483637),
                      r
                    )
                  },
                  s = function (e, r) {
                    var i = 65536
                    'firefox' === t.browser && 57 === t.version && (i = 65535)
                    var o = n.matchPrefix(e.sdp, 'a=max-message-size:')
                    return (
                      o.length > 0
                        ? (i = parseInt(o[0].substr(19), 10))
                        : 'firefox' === t.browser && -1 !== r && (i = 2147483637),
                      i
                    )
                  },
                  c = e.RTCPeerConnection.prototype.setRemoteDescription
                e.RTCPeerConnection.prototype.setRemoteDescription = function () {
                  var e = this
                  if (((e._sctp = null), r(arguments[0]))) {
                    var t,
                      n = o(arguments[0]),
                      i = a(n),
                      d = s(arguments[0], n)
                    t =
                      0 === i && 0 === d
                        ? Number.POSITIVE_INFINITY
                        : 0 === i || 0 === d
                          ? Math.max(i, d)
                          : Math.min(i, d)
                    var p = {}
                    Object.defineProperty(p, 'maxMessageSize', {
                      get: function () {
                        return t
                      }
                    }),
                      (e._sctp = p)
                  }
                  return c.apply(e, arguments)
                }
              }
            },
            shimSendThrowTypeError: function (e) {
              function t(e, t) {
                var r = e.send
                e.send = function () {
                  var n = arguments[0],
                    i = n.length || n.size || n.byteLength
                  if ('open' === e.readyState && t.sctp && i > t.sctp.maxMessageSize)
                    throw new TypeError(
                      'Message too large (can send a maximum of ' +
                        t.sctp.maxMessageSize +
                        ' bytes)'
                    )
                  return r.apply(e, arguments)
                }
              }
              if (e.RTCPeerConnection && 'createDataChannel' in e.RTCPeerConnection.prototype) {
                var r = e.RTCPeerConnection.prototype.createDataChannel
                ;(e.RTCPeerConnection.prototype.createDataChannel = function () {
                  var e = this,
                    n = r.apply(e, arguments)
                  return t(n, e), n
                }),
                  i.wrapPeerConnectionEvent(e, 'datachannel', function (e) {
                    return t(e.channel, e.target), e
                  })
              }
            }
          }
        },
        { './utils': 14, sdp: 2 }
      ],
      8: [
        function (e, t, r) {
          'use strict'
          var n = e('../utils'),
            i = e('./filtericeservers'),
            o = e('rtcpeerconnection-shim')
          t.exports = {
            shimGetUserMedia: e('./getusermedia'),
            shimPeerConnection: function (e) {
              var t = n.detectBrowser(e)
              if (
                e.RTCIceGatherer &&
                (e.RTCIceCandidate ||
                  (e.RTCIceCandidate = function (e) {
                    return e
                  }),
                e.RTCSessionDescription ||
                  (e.RTCSessionDescription = function (e) {
                    return e
                  }),
                t.version < 15025)
              ) {
                var r = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, 'enabled')
                Object.defineProperty(e.MediaStreamTrack.prototype, 'enabled', {
                  set: function (e) {
                    r.set.call(this, e)
                    var t = new Event('enabled')
                    ;(t.enabled = e), this.dispatchEvent(t)
                  }
                })
              }
              !e.RTCRtpSender ||
                'dtmf' in e.RTCRtpSender.prototype ||
                Object.defineProperty(e.RTCRtpSender.prototype, 'dtmf', {
                  get: function () {
                    return (
                      void 0 === this._dtmf &&
                        ('audio' === this.track.kind
                          ? (this._dtmf = new e.RTCDtmfSender(this))
                          : 'video' === this.track.kind && (this._dtmf = null)),
                      this._dtmf
                    )
                  }
                }),
                e.RTCDtmfSender && !e.RTCDTMFSender && (e.RTCDTMFSender = e.RTCDtmfSender)
              var a = o(e, t.version)
              ;(e.RTCPeerConnection = function (e) {
                return e && e.iceServers && (e.iceServers = i(e.iceServers)), new a(e)
              }),
                (e.RTCPeerConnection.prototype = a.prototype)
            },
            shimReplaceTrack: function (e) {
              !e.RTCRtpSender ||
                'replaceTrack' in e.RTCRtpSender.prototype ||
                (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack)
            }
          }
        },
        {
          '../utils': 14,
          './filtericeservers': 9,
          './getusermedia': 10,
          'rtcpeerconnection-shim': 1
        }
      ],
      9: [
        function (e, t, r) {
          'use strict'
          var n = e('../utils')
          t.exports = function (e, t) {
            var r = !1
            return (
              (e = JSON.parse(JSON.stringify(e))),
              e.filter(function (e) {
                if (e && (e.urls || e.url)) {
                  var i = e.urls || e.url
                  e.url && !e.urls && n.deprecated('RTCIceServer.url', 'RTCIceServer.urls')
                  var o = 'string' == typeof i
                  return (
                    o && (i = [i]),
                    (i = i.filter(function (e) {
                      return 0 !== e.indexOf('turn:') ||
                        -1 === e.indexOf('transport=udp') ||
                        -1 !== e.indexOf('turn:[') ||
                        r
                        ? 0 === e.indexOf('stun:') &&
                            t >= 14393 &&
                            -1 === e.indexOf('?transport=udp')
                        : ((r = !0), !0)
                    })),
                    delete e.url,
                    (e.urls = o ? i[0] : i),
                    !!i.length
                  )
                }
              })
            )
          }
        },
        { '../utils': 14 }
      ],
      10: [
        function (e, t, r) {
          'use strict'
          t.exports = function (e) {
            var t = e && e.navigator,
              r = function (e) {
                return {
                  name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
                  message: e.message,
                  constraint: e.constraint,
                  toString: function () {
                    return this.name
                  }
                }
              },
              n = t.mediaDevices.getUserMedia.bind(t.mediaDevices)
            t.mediaDevices.getUserMedia = function (e) {
              return n(e).catch(function (e) {
                return Promise.reject(r(e))
              })
            }
          }
        },
        {}
      ],
      11: [
        function (e, t, r) {
          'use strict'
          var n = e('../utils')
          t.exports = {
            shimGetUserMedia: e('./getusermedia'),
            shimOnTrack: function (e) {
              'object' != typeof e ||
                !e.RTCPeerConnection ||
                'ontrack' in e.RTCPeerConnection.prototype ||
                Object.defineProperty(e.RTCPeerConnection.prototype, 'ontrack', {
                  get: function () {
                    return this._ontrack
                  },
                  set: function (e) {
                    this._ontrack &&
                      (this.removeEventListener('track', this._ontrack),
                      this.removeEventListener('addstream', this._ontrackpoly)),
                      this.addEventListener('track', (this._ontrack = e)),
                      this.addEventListener(
                        'addstream',
                        (this._ontrackpoly = function (e) {
                          e.stream.getTracks().forEach(
                            function (t) {
                              var r = new Event('track')
                              ;(r.track = t),
                                (r.receiver = { track: t }),
                                (r.transceiver = { receiver: r.receiver }),
                                (r.streams = [e.stream]),
                                this.dispatchEvent(r)
                            }.bind(this)
                          )
                        }.bind(this))
                      )
                  },
                  enumerable: !0,
                  configurable: !0
                }),
                'object' == typeof e &&
                  e.RTCTrackEvent &&
                  'receiver' in e.RTCTrackEvent.prototype &&
                  !('transceiver' in e.RTCTrackEvent.prototype) &&
                  Object.defineProperty(e.RTCTrackEvent.prototype, 'transceiver', {
                    get: function () {
                      return { receiver: this.receiver }
                    }
                  })
            },
            shimSourceObject: function (e) {
              'object' == typeof e &&
                (!e.HTMLMediaElement ||
                  'srcObject' in e.HTMLMediaElement.prototype ||
                  Object.defineProperty(e.HTMLMediaElement.prototype, 'srcObject', {
                    get: function () {
                      return this.mozSrcObject
                    },
                    set: function (e) {
                      this.mozSrcObject = e
                    }
                  }))
            },
            shimPeerConnection: function (e) {
              var t = n.detectBrowser(e)
              if ('object' == typeof e && (e.RTCPeerConnection || e.mozRTCPeerConnection)) {
                e.RTCPeerConnection ||
                  ((e.RTCPeerConnection = function (r, n) {
                    if (t.version < 38 && r && r.iceServers) {
                      for (var i = [], o = 0; o < r.iceServers.length; o++) {
                        var a = r.iceServers[o]
                        if (a.hasOwnProperty('urls'))
                          for (var s = 0; s < a.urls.length; s++) {
                            var c = { url: a.urls[s] }
                            0 === a.urls[s].indexOf('turn') &&
                              ((c.username = a.username), (c.credential = a.credential)),
                              i.push(c)
                          }
                        else i.push(r.iceServers[o])
                      }
                      r.iceServers = i
                    }
                    return new e.mozRTCPeerConnection(r, n)
                  }),
                  (e.RTCPeerConnection.prototype = e.mozRTCPeerConnection.prototype),
                  e.mozRTCPeerConnection.generateCertificate &&
                    Object.defineProperty(e.RTCPeerConnection, 'generateCertificate', {
                      get: function () {
                        return e.mozRTCPeerConnection.generateCertificate
                      }
                    }),
                  (e.RTCSessionDescription = e.mozRTCSessionDescription),
                  (e.RTCIceCandidate = e.mozRTCIceCandidate)),
                  ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(
                    function (t) {
                      var r = e.RTCPeerConnection.prototype[t]
                      e.RTCPeerConnection.prototype[t] = function () {
                        return (
                          (arguments[0] = new (
                            'addIceCandidate' === t ? e.RTCIceCandidate : e.RTCSessionDescription
                          )(arguments[0])),
                          r.apply(this, arguments)
                        )
                      }
                    }
                  )
                var r = e.RTCPeerConnection.prototype.addIceCandidate
                e.RTCPeerConnection.prototype.addIceCandidate = function () {
                  return arguments[0]
                    ? r.apply(this, arguments)
                    : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                }
                var i = function (e) {
                    var t = new Map()
                    return (
                      Object.keys(e).forEach(function (r) {
                        t.set(r, e[r]), (t[r] = e[r])
                      }),
                      t
                    )
                  },
                  o = {
                    inboundrtp: 'inbound-rtp',
                    outboundrtp: 'outbound-rtp',
                    candidatepair: 'candidate-pair',
                    localcandidate: 'local-candidate',
                    remotecandidate: 'remote-candidate'
                  },
                  a = e.RTCPeerConnection.prototype.getStats
                e.RTCPeerConnection.prototype.getStats = function (e, r, n) {
                  return a
                    .apply(this, [e || null])
                    .then(function (e) {
                      if ((t.version < 48 && (e = i(e)), t.version < 53 && !r))
                        try {
                          e.forEach(function (e) {
                            e.type = o[e.type] || e.type
                          })
                        } catch (t) {
                          if ('TypeError' !== t.name) throw t
                          e.forEach(function (t, r) {
                            e.set(r, Object.assign({}, t, { type: o[t.type] || t.type }))
                          })
                        }
                      return e
                    })
                    .then(r, n)
                }
              }
            },
            shimSenderGetStats: function (e) {
              if (
                'object' == typeof e &&
                e.RTCPeerConnection &&
                e.RTCRtpSender &&
                !(e.RTCRtpSender && 'getStats' in e.RTCRtpSender.prototype)
              ) {
                var t = e.RTCPeerConnection.prototype.getSenders
                t &&
                  (e.RTCPeerConnection.prototype.getSenders = function () {
                    var e = this,
                      r = t.apply(e, [])
                    return (
                      r.forEach(function (t) {
                        t._pc = e
                      }),
                      r
                    )
                  })
                var r = e.RTCPeerConnection.prototype.addTrack
                r &&
                  (e.RTCPeerConnection.prototype.addTrack = function () {
                    var e = r.apply(this, arguments)
                    return (e._pc = this), e
                  }),
                  (e.RTCRtpSender.prototype.getStats = function () {
                    return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map())
                  })
              }
            },
            shimReceiverGetStats: function (e) {
              if (
                'object' == typeof e &&
                e.RTCPeerConnection &&
                e.RTCRtpSender &&
                !(e.RTCRtpSender && 'getStats' in e.RTCRtpReceiver.prototype)
              ) {
                var t = e.RTCPeerConnection.prototype.getReceivers
                t &&
                  (e.RTCPeerConnection.prototype.getReceivers = function () {
                    var e = this,
                      r = t.apply(e, [])
                    return (
                      r.forEach(function (t) {
                        t._pc = e
                      }),
                      r
                    )
                  }),
                  n.wrapPeerConnectionEvent(e, 'track', function (e) {
                    return (e.receiver._pc = e.srcElement), e
                  }),
                  (e.RTCRtpReceiver.prototype.getStats = function () {
                    return this._pc.getStats(this.track)
                  })
              }
            },
            shimRemoveStream: function (e) {
              !e.RTCPeerConnection ||
                'removeStream' in e.RTCPeerConnection.prototype ||
                (e.RTCPeerConnection.prototype.removeStream = function (e) {
                  var t = this
                  n.deprecated('removeStream', 'removeTrack'),
                    this.getSenders().forEach(function (r) {
                      r.track && -1 !== e.getTracks().indexOf(r.track) && t.removeTrack(r)
                    })
                })
            },
            shimRTCDataChannel: function (e) {
              e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel)
            },
            shimGetDisplayMedia: function (e, t) {
              'getDisplayMedia' in e.navigator ||
                (navigator.getDisplayMedia = function (e) {
                  if (!e || !e.video) {
                    var r = new DOMException(
                      'getDisplayMedia without video constraints is undefined'
                    )
                    return (r.name = 'NotFoundError'), (r.code = 8), Promise.reject(r)
                  }
                  return (
                    !0 === e.video ? (e.video = { mediaSource: t }) : (e.video.mediaSource = t),
                    navigator.mediaDevices.getUserMedia(e)
                  )
                })
            }
          }
        },
        { '../utils': 14, './getusermedia': 12 }
      ],
      12: [
        function (e, t, r) {
          'use strict'
          var n = e('../utils'),
            i = n.log
          t.exports = function (e) {
            var t = n.detectBrowser(e),
              r = e && e.navigator,
              o = e && e.MediaStreamTrack,
              a = function (e) {
                return {
                  name:
                    {
                      InternalError: 'NotReadableError',
                      NotSupportedError: 'TypeError',
                      PermissionDeniedError: 'NotAllowedError',
                      SecurityError: 'NotAllowedError'
                    }[e.name] || e.name,
                  message:
                    {
                      'The operation is insecure.':
                        'The request is not allowed by the user agent or the platform in the current context.'
                    }[e.message] || e.message,
                  constraint: e.constraint,
                  toString: function () {
                    return this.name + (this.message && ': ') + this.message
                  }
                }
              },
              s = function (e, n, o) {
                var s = function (e) {
                  if ('object' != typeof e || e.require) return e
                  var t = []
                  return (
                    Object.keys(e).forEach(function (r) {
                      if ('require' !== r && 'advanced' !== r && 'mediaSource' !== r) {
                        var n = (e[r] = 'object' == typeof e[r] ? e[r] : { ideal: e[r] })
                        if (
                          ((void 0 === n.min && void 0 === n.max && void 0 === n.exact) ||
                            t.push(r),
                          void 0 !== n.exact &&
                            ('number' == typeof n.exact
                              ? (n.min = n.max = n.exact)
                              : (e[r] = n.exact),
                            delete n.exact),
                          void 0 !== n.ideal)
                        ) {
                          e.advanced = e.advanced || []
                          var i = {}
                          'number' == typeof n.ideal
                            ? (i[r] = { min: n.ideal, max: n.ideal })
                            : (i[r] = n.ideal),
                            e.advanced.push(i),
                            delete n.ideal,
                            Object.keys(n).length || delete e[r]
                        }
                      }
                    }),
                    t.length && (e.require = t),
                    e
                  )
                }
                return (
                  (e = JSON.parse(JSON.stringify(e))),
                  t.version < 38 &&
                    (i('spec: ' + JSON.stringify(e)),
                    e.audio && (e.audio = s(e.audio)),
                    e.video && (e.video = s(e.video)),
                    i('ff37: ' + JSON.stringify(e))),
                  r.mozGetUserMedia(e, n, function (e) {
                    o(a(e))
                  })
                )
              },
              c = function (e) {
                return new Promise(function (t, r) {
                  s(e, t, r)
                })
              }
            if (
              (r.mediaDevices ||
                (r.mediaDevices = {
                  getUserMedia: c,
                  addEventListener: function () {},
                  removeEventListener: function () {}
                }),
              (r.mediaDevices.enumerateDevices =
                r.mediaDevices.enumerateDevices ||
                function () {
                  return new Promise(function (e) {
                    e([
                      { kind: 'audioinput', deviceId: 'default', label: '', groupId: '' },
                      { kind: 'videoinput', deviceId: 'default', label: '', groupId: '' }
                    ])
                  })
                }),
              t.version < 41)
            ) {
              var d = r.mediaDevices.enumerateDevices.bind(r.mediaDevices)
              r.mediaDevices.enumerateDevices = function () {
                return d().then(void 0, function (e) {
                  if ('NotFoundError' === e.name) return []
                  throw e
                })
              }
            }
            if (t.version < 49) {
              var p = r.mediaDevices.getUserMedia.bind(r.mediaDevices)
              r.mediaDevices.getUserMedia = function (e) {
                return p(e).then(
                  function (t) {
                    if (
                      (e.audio && !t.getAudioTracks().length) ||
                      (e.video && !t.getVideoTracks().length)
                    )
                      throw (
                        (t.getTracks().forEach(function (e) {
                          e.stop()
                        }),
                        new DOMException('The object can not be found here.', 'NotFoundError'))
                      )
                    return t
                  },
                  function (e) {
                    return Promise.reject(a(e))
                  }
                )
              }
            }
            if (
              !(t.version > 55 && 'autoGainControl' in r.mediaDevices.getSupportedConstraints())
            ) {
              var l = function (e, t, r) {
                  t in e && !(r in e) && ((e[r] = e[t]), delete e[t])
                },
                u = r.mediaDevices.getUserMedia.bind(r.mediaDevices)
              if (
                ((r.mediaDevices.getUserMedia = function (e) {
                  return (
                    'object' == typeof e &&
                      'object' == typeof e.audio &&
                      ((e = JSON.parse(JSON.stringify(e))),
                      l(e.audio, 'autoGainControl', 'mozAutoGainControl'),
                      l(e.audio, 'noiseSuppression', 'mozNoiseSuppression')),
                    u(e)
                  )
                }),
                o && o.prototype.getSettings)
              ) {
                var f = o.prototype.getSettings
                o.prototype.getSettings = function () {
                  var e = f.apply(this, arguments)
                  return (
                    l(e, 'mozAutoGainControl', 'autoGainControl'),
                    l(e, 'mozNoiseSuppression', 'noiseSuppression'),
                    e
                  )
                }
              }
              if (o && o.prototype.applyConstraints) {
                var v = o.prototype.applyConstraints
                o.prototype.applyConstraints = function (e) {
                  return (
                    'audio' === this.kind &&
                      'object' == typeof e &&
                      ((e = JSON.parse(JSON.stringify(e))),
                      l(e, 'autoGainControl', 'mozAutoGainControl'),
                      l(e, 'noiseSuppression', 'mozNoiseSuppression')),
                    v.apply(this, [e])
                  )
                }
              }
            }
            r.getUserMedia = function (e, i, o) {
              if (t.version < 44) return s(e, i, o)
              n.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia'),
                r.mediaDevices.getUserMedia(e).then(i, o)
            }
          }
        },
        { '../utils': 14 }
      ],
      13: [
        function (e, t, r) {
          'use strict'
          var n = e('../utils')
          t.exports = {
            shimLocalStreamsAPI: function (e) {
              if ('object' == typeof e && e.RTCPeerConnection) {
                if (
                  ('getLocalStreams' in e.RTCPeerConnection.prototype ||
                    (e.RTCPeerConnection.prototype.getLocalStreams = function () {
                      return this._localStreams || (this._localStreams = []), this._localStreams
                    }),
                  'getStreamById' in e.RTCPeerConnection.prototype ||
                    (e.RTCPeerConnection.prototype.getStreamById = function (e) {
                      var t = null
                      return (
                        this._localStreams &&
                          this._localStreams.forEach(function (r) {
                            r.id === e && (t = r)
                          }),
                        this._remoteStreams &&
                          this._remoteStreams.forEach(function (r) {
                            r.id === e && (t = r)
                          }),
                        t
                      )
                    }),
                  !('addStream' in e.RTCPeerConnection.prototype))
                ) {
                  var t = e.RTCPeerConnection.prototype.addTrack
                  ;(e.RTCPeerConnection.prototype.addStream = function (e) {
                    this._localStreams || (this._localStreams = []),
                      -1 === this._localStreams.indexOf(e) && this._localStreams.push(e)
                    var r = this
                    e.getTracks().forEach(function (n) {
                      t.call(r, n, e)
                    })
                  }),
                    (e.RTCPeerConnection.prototype.addTrack = function (e, r) {
                      return (
                        r &&
                          (this._localStreams
                            ? -1 === this._localStreams.indexOf(r) && this._localStreams.push(r)
                            : (this._localStreams = [r])),
                        t.call(this, e, r)
                      )
                    })
                }
                'removeStream' in e.RTCPeerConnection.prototype ||
                  (e.RTCPeerConnection.prototype.removeStream = function (e) {
                    this._localStreams || (this._localStreams = [])
                    var t = this._localStreams.indexOf(e)
                    if (-1 !== t) {
                      this._localStreams.splice(t, 1)
                      var r = this,
                        n = e.getTracks()
                      this.getSenders().forEach(function (e) {
                        ;-1 !== n.indexOf(e.track) && r.removeTrack(e)
                      })
                    }
                  })
              }
            },
            shimRemoteStreamsAPI: function (e) {
              if (
                'object' == typeof e &&
                e.RTCPeerConnection &&
                ('getRemoteStreams' in e.RTCPeerConnection.prototype ||
                  (e.RTCPeerConnection.prototype.getRemoteStreams = function () {
                    return this._remoteStreams ? this._remoteStreams : []
                  }),
                !('onaddstream' in e.RTCPeerConnection.prototype))
              ) {
                Object.defineProperty(e.RTCPeerConnection.prototype, 'onaddstream', {
                  get: function () {
                    return this._onaddstream
                  },
                  set: function (e) {
                    this._onaddstream && this.removeEventListener('addstream', this._onaddstream),
                      this.addEventListener('addstream', (this._onaddstream = e))
                  }
                })
                var t = e.RTCPeerConnection.prototype.setRemoteDescription
                e.RTCPeerConnection.prototype.setRemoteDescription = function () {
                  var e = this
                  return (
                    this._onaddstreampoly ||
                      this.addEventListener(
                        'track',
                        (this._onaddstreampoly = function (t) {
                          t.streams.forEach(function (t) {
                            if (
                              (e._remoteStreams || (e._remoteStreams = []),
                              !(e._remoteStreams.indexOf(t) >= 0))
                            ) {
                              e._remoteStreams.push(t)
                              var r = new Event('addstream')
                              ;(r.stream = t), e.dispatchEvent(r)
                            }
                          })
                        })
                      ),
                    t.apply(e, arguments)
                  )
                }
              }
            },
            shimCallbacksAPI: function (e) {
              if ('object' == typeof e && e.RTCPeerConnection) {
                var t = e.RTCPeerConnection.prototype,
                  r = t.createOffer,
                  n = t.createAnswer,
                  i = t.setLocalDescription,
                  o = t.setRemoteDescription,
                  a = t.addIceCandidate
                ;(t.createOffer = function (e, t) {
                  var n = arguments.length >= 2 ? arguments[2] : arguments[0],
                    i = r.apply(this, [n])
                  return t ? (i.then(e, t), Promise.resolve()) : i
                }),
                  (t.createAnswer = function (e, t) {
                    var r = arguments.length >= 2 ? arguments[2] : arguments[0],
                      i = n.apply(this, [r])
                    return t ? (i.then(e, t), Promise.resolve()) : i
                  })
                var s = function (e, t, r) {
                  var n = i.apply(this, [e])
                  return r ? (n.then(t, r), Promise.resolve()) : n
                }
                ;(t.setLocalDescription = s),
                  (s = function (e, t, r) {
                    var n = o.apply(this, [e])
                    return r ? (n.then(t, r), Promise.resolve()) : n
                  }),
                  (t.setRemoteDescription = s),
                  (s = function (e, t, r) {
                    var n = a.apply(this, [e])
                    return r ? (n.then(t, r), Promise.resolve()) : n
                  }),
                  (t.addIceCandidate = s)
              }
            },
            shimGetUserMedia: function (e) {
              var t = e && e.navigator
              t.getUserMedia ||
                (t.webkitGetUserMedia
                  ? (t.getUserMedia = t.webkitGetUserMedia.bind(t))
                  : t.mediaDevices &&
                    t.mediaDevices.getUserMedia &&
                    (t.getUserMedia = function (e, r, n) {
                      t.mediaDevices.getUserMedia(e).then(r, n)
                    }.bind(t)))
            },
            shimRTCIceServerUrls: function (e) {
              var t = e.RTCPeerConnection
              ;(e.RTCPeerConnection = function (e, r) {
                if (e && e.iceServers) {
                  for (var i = [], o = 0; o < e.iceServers.length; o++) {
                    var a = e.iceServers[o]
                    !a.hasOwnProperty('urls') && a.hasOwnProperty('url')
                      ? (n.deprecated('RTCIceServer.url', 'RTCIceServer.urls'),
                        (a = JSON.parse(JSON.stringify(a))),
                        (a.urls = a.url),
                        delete a.url,
                        i.push(a))
                      : i.push(e.iceServers[o])
                  }
                  e.iceServers = i
                }
                return new t(e, r)
              }),
                (e.RTCPeerConnection.prototype = t.prototype),
                'generateCertificate' in e.RTCPeerConnection &&
                  Object.defineProperty(e.RTCPeerConnection, 'generateCertificate', {
                    get: function () {
                      return t.generateCertificate
                    }
                  })
            },
            shimTrackEventTransceiver: function (e) {
              'object' == typeof e &&
                e.RTCPeerConnection &&
                'receiver' in e.RTCTrackEvent.prototype &&
                !e.RTCTransceiver &&
                Object.defineProperty(e.RTCTrackEvent.prototype, 'transceiver', {
                  get: function () {
                    return { receiver: this.receiver }
                  }
                })
            },
            shimCreateOfferLegacy: function (e) {
              var t = e.RTCPeerConnection.prototype.createOffer
              e.RTCPeerConnection.prototype.createOffer = function (e) {
                var r = this
                if (e) {
                  void 0 !== e.offerToReceiveAudio &&
                    (e.offerToReceiveAudio = !!e.offerToReceiveAudio)
                  var n = r.getTransceivers().find(function (e) {
                    return e.sender.track && 'audio' === e.sender.track.kind
                  })
                  !1 === e.offerToReceiveAudio && n
                    ? 'sendrecv' === n.direction
                      ? n.setDirection
                        ? n.setDirection('sendonly')
                        : (n.direction = 'sendonly')
                      : 'recvonly' === n.direction &&
                        (n.setDirection ? n.setDirection('inactive') : (n.direction = 'inactive'))
                    : !0 !== e.offerToReceiveAudio || n || r.addTransceiver('audio'),
                    void 0 !== e.offerToReceiveVideo &&
                      (e.offerToReceiveVideo = !!e.offerToReceiveVideo)
                  var i = r.getTransceivers().find(function (e) {
                    return e.sender.track && 'video' === e.sender.track.kind
                  })
                  !1 === e.offerToReceiveVideo && i
                    ? 'sendrecv' === i.direction
                      ? i.setDirection('sendonly')
                      : 'recvonly' === i.direction && i.setDirection('inactive')
                    : !0 !== e.offerToReceiveVideo || i || r.addTransceiver('video')
                }
                return t.apply(r, arguments)
              }
            }
          }
        },
        { '../utils': 14 }
      ],
      14: [
        function (e, t, r) {
          'use strict'
          function n(e, t, r) {
            var n = e.match(t)
            return n && n.length >= r && parseInt(n[r], 10)
          }
          function i(e, t, r) {
            if (e.RTCPeerConnection) {
              var n = e.RTCPeerConnection.prototype,
                i = n.addEventListener
              n.addEventListener = function (e, n) {
                if (e !== t) return i.apply(this, arguments)
                var o = function (e) {
                  var t = r(e)
                  t && n(t)
                }
                return (
                  (this._eventMap = this._eventMap || {}),
                  (this._eventMap[n] = o),
                  i.apply(this, [e, o])
                )
              }
              var o = n.removeEventListener
              ;(n.removeEventListener = function (e, r) {
                if (e !== t || !this._eventMap || !this._eventMap[r])
                  return o.apply(this, arguments)
                var n = this._eventMap[r]
                return delete this._eventMap[r], o.apply(this, [e, n])
              }),
                Object.defineProperty(n, 'on' + t, {
                  get: function () {
                    return this['_on' + t]
                  },
                  set: function (e) {
                    this['_on' + t] &&
                      (this.removeEventListener(t, this['_on' + t]), delete this['_on' + t]),
                      e && this.addEventListener(t, (this['_on' + t] = e))
                  },
                  enumerable: !0,
                  configurable: !0
                })
            }
          }
          var o = !0,
            a = !0
          t.exports = {
            extractVersion: n,
            wrapPeerConnectionEvent: i,
            disableLog: function (e) {
              return 'boolean' != typeof e
                ? new Error('Argument type: ' + typeof e + '. Please use a boolean.')
                : ((o = e), e ? 'adapter.js logging disabled' : 'adapter.js logging enabled')
            },
            disableWarnings: function (e) {
              return 'boolean' != typeof e
                ? new Error('Argument type: ' + typeof e + '. Please use a boolean.')
                : ((a = !e), 'adapter.js deprecation warnings ' + (e ? 'disabled' : 'enabled'))
            },
            log: function () {
              if ('object' == typeof window) {
                if (o) return
                'undefined' != typeof console &&
                  'function' == typeof console.log &&
                  console.log.apply(console, arguments)
              }
            },
            deprecated: function (e, t) {
              a && console.warn(e + ' is deprecated, please use ' + t + ' instead.')
            },
            detectBrowser: function (e) {
              var t = e && e.navigator,
                r = {}
              if (((r.browser = null), (r.version = null), void 0 === e || !e.navigator))
                return (r.browser = 'Not a browser.'), r
              if (t.mozGetUserMedia)
                (r.browser = 'firefox'), (r.version = n(t.userAgent, /Firefox\/(\d+)\./, 1))
              else if (t.webkitGetUserMedia)
                (r.browser = 'chrome'), (r.version = n(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2))
              else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/))
                (r.browser = 'edge'), (r.version = n(t.userAgent, /Edge\/(\d+).(\d+)$/, 2))
              else {
                if (!e.RTCPeerConnection || !t.userAgent.match(/AppleWebKit\/(\d+)\./))
                  return (r.browser = 'Not a supported browser.'), r
                ;(r.browser = 'safari'), (r.version = n(t.userAgent, /AppleWebKit\/(\d+)\./, 1))
              }
              return r
            }
          }
        },
        {}
      ]
    },
    {},
    [3]
  )(3)
})
var StringeeServiceType = {
    PING: 1,
    AUTHEN: 2,
    CALL_START: 26,
    CALL_SDP_CANDIDATE: 27,
    CALL_STOP: 28,
    CALL_SDP_CANDIDATE_FROM_SERVER: 29,
    CALL_STOP_FROM_SERVER: 30,
    CALL_STATE: 31,
    CALL_STATE_FROM_SERVER: 32,
    CALL_START_FROM_SERVER: 33,
    CALL_DTMF: 34,
    CALL_DTMF_FROM_SERVER: 35,
    CALL_INFO: 36,
    CALL_INFO_FROM_SERVER: 37,
    MSG_FROM_OTHER_DEVICE: 38,
    PUSH_DEVICE_TOKEN_REGISTER: 39,
    PUSH_DEVICE_TOKEN_UNREGISTER: 40,
    CHAT_CREATE_CONVERSATION: 41,
    CHAT_MESSAGE: 42,
    CHAT_MESSAGE_FROM_SERVER: 45,
    CHAT_MESSAGE_REPORT: 46,
    CHAT_MESSAGE_REPORT_FROM_SERVER: 47,
    CHAT_CONVERSATION_LOAD: 48,
    CHAT_MESSAGES_LOAD: 50,
    CHAT_CONVERSATION_CLEAR_HISTORY: 51,
    CHAT_DELETE_CONVERSATION: 52,
    CUSTOM_MESSAGE: 54,
    CUSTOM_MESSAGE_FROM_SERVER: 55,
    CHAT_GET_USERS_INFO: 56,
    CHAT_GET_CONVERSATIONS_INFO: 57,
    CHAT_ADD_PARTICIPANT: 58,
    CHAT_ADD_PARTICIPANT_FROM_SERVER: 59,
    CHAT_REMOVE_PARTICIPANT: 60,
    CHAT_REMOVE_PARTICIPANT_FROM_SERVER: 61,
    CHAT_DELETE_MESSAGE: 62,
    CHAT_UPDATE_CONVERSATION: 63,
    CHAT_ROUTE_TO_AGENT: 64,
    CHAT_AGENT_RESPONSE: 65,
    TIMEOUT_ROUTE_TO_AGENT: 66,
    TIMEOUT_ROUTE_TO_QUEUE: 67,
    END_CHAT: 68,
    HOLD: 100,
    TRANSFER: 101,
    SUBSCRIBE_FROM_SERVER: 102,
    CHANGE_ATTRIBUTE: 103,
    OTHER_DEVICE_AUTHEN: 104,
    CHAT_BLOCK_USER: 105
  },
  WEBRTC_ERROR_CODE_CREATE_PEER_CONNECTION_FAILED = 1001,
  WEBRTC_ERROR_CODE_GET_USER_MEDIA_ERROR = 1002,
  WEBRTC_ERROR_CODE_CREATE_SDP_FAILED = 1003,
  StringeeServiceType = StringeeServiceType || {},
  StringeeProcessor = StringeeProcessor || {},
  StringeeChatProcessor = StringeeChatProcessor || {},
  StringeeUtil = StringeeUtil || {}
;(StringeeUtil.allClientsOfThisBrowser = []),
  (StringeeUtil.allClients = []),
  (StringeeUtil.getActiveClientId = function () {
    return localStorage.getItem('active_client_id')
  }),
  (StringeeClient.prototype.getClientId = function () {
    return this.deviceId
  }),
  (StringeeClient.prototype.getBrowserId = function () {
    return this.browserId
  }),
  (StringeeClient.prototype.setThisClientIsActive = function (e) {
    e
      ? localStorage.setItem('active_client_id', this.deviceId)
      : localStorage.removeItem('active_client_id')
  }),
  (StringeeClient.prototype.isActiveClient = function () {
    var e = localStorage.getItem('active_client_id')
    return this.deviceId == e
  }),
  (StringeeClient.prototype.findCallByCallId = function (e) {
    for (var t = 0; t < this._stringeeCalls.length; t++) {
      var r = this._stringeeCalls[t]
      if (r.callId === e) return r
    }
    return null
  }),
  (StringeeClient.prototype._pushCallback = function (e, t) {
    if (t) {
      var r = this._callbacks.get(e)
      r || (r = []), r.push(t), this._callbacks.put(e, r)
    }
  }),
  (StringeeClient.prototype._callCallback = function (e, t) {
    var r = !1,
      n = this._callbacks.get(e)
    if (n) {
      var i = n.pop()
      i && (i.call(this, t), (r = !0))
    }
    return r
  }),
  (StringeeClient.prototype.connect = function (e) {
    var t = this
    this.socket && (this.socket.disconnect(), (this.socket = null)),
      (this.socket = io(t._stringeeServerAddr, { autoConnect: !1 })),
      this.socket.on('connect', function () {
        t._callOnEvent('connect')
        var r = screen.width,
          n = screen.height,
          i = localStorage.getItem('stringee_browser_id')
        i || ((i = 'browser-' + this._genUuid()), localStorage.setItem('stringee_browser_id', i))
        var o = {
          accesstoken: e,
          deviceId: t.deviceId,
          browserId: t.browserId,
          sessionId: t.sessionId,
          platform: 3,
          platformVersion: '',
          deviceName: navigator.userAgent,
          screenSize: r + 'x' + n,
          sdkVersion: '1.5.9'
        }
        t._sendMessage(StringeeServiceType.AUTHEN, o, function (e) {
          0 === e.r &&
            e.clients.forEach(function (e) {
              StringeeUtil.allClients.push(e.clientId),
                e.browserId === t.getBrowserId() &&
                  StringeeUtil.allClientsOfThisBrowser.push(e.clientId),
                StringeeUtil.allClients.sort(),
                StringeeUtil.allClientsOfThisBrowser.sort()
            }),
            t._callOnEvent('authen', e),
            6 === e.r && t._callOnEvent('requestnewtoken')
        })
      }),
      this.socket.on('disconnect', function () {
        t._callOnEvent('disconnect')
      }),
      this.socket.on('error', function () {
        t.socket.reconnect()
      }),
      this.socket.on('EventPacket', function (e) {
        var r = JSON.parse(e.body),
          n = e.service
        t._packetReceived(n, r)
      }),
      (this.accessToken = e),
      this.socket.open()
  }),
  (StringeeClient.prototype.disconnect = function () {
    this.socket && this.socket.close()
  }),
  (StringeeClient.prototype.sendCustomMessage = function (e, t, r) {
    var n = this,
      i = { toUser: e, message: t }
    this._sendMessage(StringeeServiceType.CUSTOM_MESSAGE, i, function (e) {
      if (r) return void r.call(n, e)
    })
  }),
  (StringeeClient.prototype.changeAttribute = function (e, t, r) {
    var n = this,
      i = { attribute: e, value: t }
    this._sendMessage(StringeeServiceType.CHANGE_ATTRIBUTE, i, function (e) {
      if (r) return void r.call(n, e)
    })
  }),
  (StringeeClient.prototype._sendMessage = function (e, t, r) {
    if ((t.requestId || (t.requestId = this._currentRequestId), r)) {
      var n = 'packet_' + e + '_' + t.requestId
      this._pushCallback(n, r)
    }
    var i = { service: e, body: JSON.stringify(t) }
    this.socket.emit('EventPacket', i), this._currentRequestId++
  }),
  (StringeeClient.prototype._packetReceived = function (e, t) {
    var r,
      n = !1
    if (t.requestId) {
      var i = 'packet_' + e + '_' + t.requestId
      r = this._callCallback(i, t)
    }
    e === StringeeServiceType.CALL_SDP_CANDIDATE_FROM_SERVER
      ? StringeeProcessor._callSdpCandidateFromServer(this, t)
      : e === StringeeServiceType.CALL_STATE_FROM_SERVER
        ? StringeeProcessor._callStateFromServer(this, t)
        : e === StringeeServiceType.CALL_STOP_FROM_SERVER
          ? StringeeProcessor._callStopFromServer(this, t)
          : e === StringeeServiceType.CALL_START_FROM_SERVER
            ? StringeeProcessor._callStartFromServer(this, t)
            : e === StringeeServiceType.PING
              ? this._sendMessage(StringeeServiceType.PING, {})
              : e === StringeeServiceType.CALL_INFO_FROM_SERVER
                ? StringeeProcessor._callInfoFromServer(this, t)
                : e === StringeeServiceType.MSG_FROM_OTHER_DEVICE
                  ? this._msgFromOtherDevice(t)
                  : e === StringeeServiceType.CUSTOM_MESSAGE_FROM_SERVER
                    ? this._callOnEvent('custommessage', t)
                    : e === StringeeServiceType.OTHER_DEVICE_AUTHEN
                      ? this._otherDeviceAuthen(t)
                      : e === StringeeServiceType.CHAT_MESSAGE_FROM_SERVER
                        ? this._callOnEvent('chatmessage', t)
                        : e === StringeeServiceType.CHAT_MESSAGE_REPORT_FROM_SERVER
                          ? StringeeChatProcessor._msgReportFromServer(this, t)
                          : e === StringeeServiceType.CHAT_ROUTE_TO_AGENT
                            ? StringeeChatProcessor._routeChatToAgent(this, t)
                            : e === StringeeServiceType.SUBSCRIBE_FROM_SERVER
                              ? this._callOnEvent('messagefromtopic', t)
                              : (n = !0),
      r && (n = !1),
      n && console.log('===Packet received: service=' + e + '; body=' + JSON.stringify(t))
  }),
  (StringeeClient.prototype._otherDeviceAuthen = function (e) {
    if ('disconnected' === e.status) {
      for (var t = 0; t < StringeeUtil.allClients.length; t++) {
        var r = StringeeUtil.allClients[t]
        r === e.clientId && StringeeUtil.allClients.splice(t, 1)
      }
      if (e.browserId === this.getBrowserId())
        for (var t = 0; t < StringeeUtil.allClientsOfThisBrowser.length; t++) {
          var r = StringeeUtil.allClientsOfThisBrowser[t]
          r === e.clientId && StringeeUtil.allClientsOfThisBrowser.splice(t, 1)
        }
    } else
      StringeeUtil.allClients.push(e.clientId),
        e.browserId === this.getBrowserId() &&
          StringeeUtil.allClientsOfThisBrowser.push(e.clientId),
        StringeeUtil.allClients.sort(),
        StringeeUtil.allClientsOfThisBrowser.sort()
    this._callOnEvent('otherdeviceauthen', e)
  }),
  (StringeeClient.prototype._msgFromOtherDevice = function (e) {
    var t = e.data
    if ('CALL_STATE' === e.type) {
      var r = this.findCallByCallId(t.callId)
      r &&
        (200 === t.code && (r.answeredOnAnotherDevice = !0),
        r._callOnEvent('otherdevice', { type: 'CALL_STATE', code: t.code }),
        486 === t.code || 603 === t.code
          ? ((r.ended = !0), r._freeResource(), r.onRemove())
          : 200 === t.code && r._freeResource())
    } else if ('CALL_END' === e.type) {
      var r = this.findCallByCallId(t.callId)
      r && ((r.ended = !0), r._callOnEvent('otherdevice', { type: 'CALL_END' }))
    } else console.log('===_msgFromOtherDevice: body=' + JSON.stringify(e))
  })
var StringeeCallState = {
    INIT: 0,
    CALLING: 1,
    RINGING: 2,
    ANSWERED: 3,
    CONNECTED: 4,
    BUSY: 5,
    ENDED: 6
  },
  StringeeServiceType = StringeeServiceType || {},
  StringeeCallState = StringeeCallState || {}
;(StringeeCall.prototype.makeCall = function (e) {
  if (this.isIncomingCall) return void console.log('could not make call, this is a incoming call')
  var t = this,
    r = {
      fromNumber: this.fromNumber,
      toNumber: this.toNumber,
      video: this.isVideoCall,
      custom: t.custom
    }
  this.client._sendMessage(StringeeServiceType.CALL_START, r, function (r) {
    var n = r.r,
      i = r.iceServers
    delete r.iceServers,
      0 == n
        ? ((t.callId = r.callId),
          (t._iceServers = i),
          (t.toType = r.toType),
          (t.customDataFromYourServer = r.customDataFromYourServer),
          t._initPeerConnection(!0, e, r))
        : ((t.ended = !0), e.call(t, r))
  })
}),
  (StringeeCall.prototype.answer = function (e) {
    var t = this
    if (!this.isIncomingCall)
      return void console.log('Error: could not answer call, this is a outgoing call')
    if (this.isAnswered) return void console.log('Error: call has been answered')
    if (this.answeredOnAnotherDevice)
      return void console.log('Error: call has been answered on other device')
    this.isAnswered = !0
    var r = { callId: this.callId, code: 200 }
    this.client._sendMessage(StringeeServiceType.CALL_STATE, r, function (r) {
      if (e) return void e.call(t, { r: r.r })
    }),
      t.fromInternal || t._onRemoteSDP(),
      t._checkAndAddCandidateFromQueue()
  }),
  (StringeeCall.prototype.reject = function (e) {
    var t = this
    if (!this.isIncomingCall)
      return void console.log('could not reject call, this is a outgoing call')
    t.ended = !0
    var r = { callId: this.callId, code: 486 }
    this.client._sendMessage(StringeeServiceType.CALL_STATE, r, function (r) {
      if (e) return void e.call(t, { r: r.r })
    }),
      this._freeResource(),
      this.onRemove()
  }),
  (StringeeCall.prototype.onRemove = function () {
    var e = this.client._stringeeCalls.indexOf(this)
    e > -1 && this.client._stringeeCalls.splice(e, 1)
  }),
  (StringeeCall.prototype.ringing = function (e) {
    var t = this
    if (!this.isIncomingCall)
      return void console.log('could not send ringing signal, this is a outgoing call')
    var r = { callId: this.callId, code: 180 }
    this.client._sendMessage(StringeeServiceType.CALL_STATE, r, function (r) {
      if (e) return void e.call(t, { r: r.r })
    }),
      this._freeResource()
  }),
  (StringeeCall.prototype.hangup = function (e) {
    var t = this
    if (((t.ended = !0), !t._pc && e)) return void e.call(t, { r: -1 })
    var r = { callId: this.callId }
    this.client._sendMessage(StringeeServiceType.CALL_STOP, r, function (r) {
      0 === r.r && (t._freeResource(), t.onRemove()), e && e.call(t, { r: r.r })
    })
  }),
  (StringeeCall.prototype.sendInfo = function (e, t) {
    var r = this,
      n = { callId: this.callId, info: e }
    this.client._sendMessage(StringeeServiceType.CALL_INFO, n, function (e) {
      if (t) return void t.call(r, { r: e.r })
    })
  }),
  (StringeeCall.prototype.sendDtmf = function (e, t) {
    var r = this,
      n = { callId: this.callId, digits: e }
    this.client._sendMessage(StringeeServiceType.CALL_DTMF, n, function (e) {
      if (t) return void t.call(r, { r: e.r })
    })
  }),
  (StringeeCall.prototype.sendTransfer = function (e, t) {
    var r = this,
      n = { callId: this.callId, to: { number: e, type: 'internal', alias: e } }
    this.client._sendMessage(StringeeServiceType.TRANSFER, n, function (e) {
      if (t) return void t.call(r, { r: e.r })
    })
  })
var StringeeProcessor = StringeeProcessor || {}
;(StringeeProcessor._callSdpCandidateFromServer = function (e, t) {
  var r = e.findCallByCallId(t.callId)
  if (!r) return void console.log('error could not found call for: ' + t.callId)
  if (r.answeredOnAnotherDevice) return void console.log('answeredOnAnotherDevice')
  var n = t.deviceId
  if ((n || (n = ''), 'sdp' === t.type)) {
    var i = { type: t.data.type, sdp: t.data.sdp },
      o = new RTCSessionDescription(i)
    r._remoteSdps.put(n + '', o), r._pc && r._onRemoteSDP()
  } else if ('candidate' === t.type) {
    var a = new RTCIceCandidate(t.data),
      s = r._mapListCandidates.get(n + '')
    s || ((s = new StringeeHashMap()), r._mapListCandidates.put(n + '', s)),
      s.push(a),
      r._checkAndAddCandidateFromQueue()
  }
}),
  (StringeeProcessor._callStateFromServer = function (e, t) {
    var r = e.findCallByCallId(t.callId)
    if (!r) return void console.log('error could not found call for: ' + t.callId)
    var n = -1,
      i = '',
      o = t.deviceId
    o || (o = ''),
      100 === t.code
        ? ((n = StringeeCallState.CALLING), (i = 'Calling'))
        : 180 === t.code || 183 === t.code
          ? ((n = StringeeCallState.RINGING), (i = 'Ringing'))
          : 486 === t.code || 603 === t.code
            ? ((n = StringeeCallState.BUSY), (i = 'Busy here'))
            : t.code >= 400
              ? ((n = StringeeCallState.ENDED), (i = 'Ended'))
              : 200 === t.code &&
                ((n = StringeeCallState.ANSWERED), (i = 'Answered'), (r._answeredDeviceId = o)),
      t.code >= 400 ? (r.ended = !0) : 200 === t.code && (r.isAnswered = !0),
      n > -1
        ? r._callOnEvent('signalingstate', {
            reason: i,
            code: n,
            sipCode: t.code,
            sipReason: t.reason
          })
        : console.log('error: unknow code: ' + t.code),
      t.code >= 400
        ? (r._freeResource(), r.onRemove())
        : 200 === t.code && (r._pc && r._onRemoteSDP(), r._checkAndAddCandidateFromQueue())
  }),
  (StringeeProcessor._callStopFromServer = function (e, t) {
    var r = e.findCallByCallId(t.callId)
    if (!r) return void console.log('error could not found call for: ' + t.callId)
    ;(r.ended = !0),
      r._freeResource(),
      r.onRemove(),
      r._callOnEvent('signalingstate', {
        reason: 'Ended',
        code: StringeeCallState.ENDED,
        sipCode: -1,
        sipReason: 'Bye'
      })
  }),
  (StringeeProcessor._callStartFromServer = function (e, t) {
    var r = new StringeeCall(e, t.fromNumber, t.toNumber, t.video)
    ;(r._iceServers = t.iceServers),
      (r.callId = t.callId),
      (r.isIncomingCall = !0),
      (r.fromAlias = t.fromAlias),
      (r.toAlias = t.toAlias),
      (r.fromInternal = t.fromInternal),
      (r.customDataFromYourServer = t.customDataFromYourServer),
      r._initPeerConnection(!1),
      e._callOnEvent('incomingcall', r)
  }),
  (StringeeProcessor._callInfoFromServer = function (e, t) {
    var r = e.findCallByCallId(t.callId)
    if (!r) return void console.log('error could not found call for: ' + t.callId)
    r._callOnEvent('info', t.info)
  })
var StringeeClient = StringeeClient || {},
  StringeeCall = StringeeCall || {},
  StringeeUtil = StringeeUtil || {}
;(StringeeClient.prototype.on = function (e, t) {
  this._onMethods.put(e, t)
}),
  (StringeeClient.prototype._callOnEvent = function (e, t) {
    var r = this._onMethods.get(e)
    r
      ? t
        ? r.call(this, t)
        : r.call(this)
      : console.log('Please implement StringeeClient event: ' + e)
  }),
  (StringeeCall.prototype.on = function (e, t) {
    this._onMethods.put(e, t)
  }),
  (StringeeCall.prototype._callOnEvent = function (e, t) {
    var r = this._onMethods.get(e)
    r
      ? t
        ? r.call(this, t)
        : r.call(this)
      : console.log('Please implement StringeeCall event: ' + e)
  }),
  (StringeeClient.prototype._genUuid = function () {
    function e() {
      return Math.floor(65536 * (1 + Math.random()))
        .toString(16)
        .substring(1)
    }
    return e() + e() + '-' + e() + '-' + e() + '-' + e() + '-' + e() + e() + e()
  }),
  (StringeeUtil.isWebRTCSupported = function () {
    return (
      !(!navigator || 'undefined' == typeof navigator) &&
      !(!navigator.mediaDevices || void 0 === navigator.mediaDevices) &&
      !(!navigator.mediaDevices.getUserMedia || void 0 === navigator.mediaDevices.getUserMedia)
    )
  })
var StringeeCall = StringeeCall || {},
  StringeeServiceType = StringeeServiceType || {},
  StringeeCallState = StringeeCallState || {}
;(StringeeCall.prototype._initPeerConnection = function (e, t, r) {
  function n(n) {
    t && t.call(o, r)
    try {
      var i = { iceServers: o._iceServers },
        a = new RTCPeerConnection(i)
      ;(a.onicecandidate = function (e) {
        o._onicecandidate(e)
      }),
        (a.oniceconnectionstatechange = function (e) {
          'connected' === a.iceConnectionState
            ? ((o._mediaConnected = !0),
              o._callOnEvent('mediastate', { reason: 'Connected', code: 1 }))
            : 'disconnected' === a.iceConnectionState &&
              o._callOnEvent('mediastate', { reason: 'Disconnected', code: 2 })
        }),
        (a.ontrack = function (e) {
          o._ontrack(e)
        }),
        n.getTracks().forEach(function (e) {
          a.addTrack(e, n)
        }),
        (n.onremovetrack = function (e) {
          console.log('=========localStream1.onremovetrack======', e)
        }),
        (o._pc = a),
        (o._localStream = n),
        o._callOnEvent('addlocalstream', o._localStream),
        e
          ? a.createOffer(function (e) {
              o._onCreateLocalSdpSuccess(e)
            }, o._onCreateLocalSdpError)
          : o._remoteSdps.size() > 0 && o._onRemoteSDP(),
        o.ended && (o._freeResource(), o.onRemove())
    } catch (e) {
      console.log(e), o._freeResource(), o.onRemove()
      var s = { callId: o.callId }
      o.client._sendMessage(StringeeServiceType.CALL_STOP, s, function (e) {}),
        o._callOnEvent('error', { reason: 'CREATE_PEER_CONNECTION_ERROR', code: 1001, moreInfo: e })
    }
  }
  function i(e) {
    t && ((r.r = 1e3), (r.message = 'GET_USER_MEDIA_ERROR'), (r.moreInfo = e), t.call(o, r)),
      o._getUserMediaError(e)
  }
  var o = this,
    a = { audio: !0, video: o._buildVideoConstraints(!1) }
  navigator.mediaDevices.getUserMedia(a).then(n).catch(i)
}),
  (StringeeCall.prototype.hold = function () {
    var e = this
    return e._pc
      ? e.isAnswered
        ? e.isOnHold
          ? (console.log('Call is on hold'), !1)
          : (e._pc.createOffer(function (t) {
              var r = t.sdp.replace('a=sendrecv', 'a=sendonly'),
                n = { type: t.type, sdp: r },
                i = new RTCSessionDescription(n)
              e._onCreateLocalSdpSuccess(i)
            }, e._onCreateLocalSdpError),
            (e.isOnHold = !0),
            !0)
        : (console.log('Call not answered'), !1)
      : (console.log('RTCPeerConnection not created'), !1)
  }),
  (StringeeCall.prototype.unhold = function () {
    var e = this
    return e._pc
      ? e.isAnswered
        ? e.isOnHold
          ? (e._pc.createOffer(function (t) {
              var r = t.sdp.replace('a=sendonly', 'a=sendrecv')
              r = r.replace('a=inactive', 'a=sendrecv')
              var n = { type: t.type, sdp: r },
                i = new RTCSessionDescription(n)
              e._onCreateLocalSdpSuccess(i)
            }, e._onCreateLocalSdpError),
            (e.isOnHold = !1),
            !0)
          : (console.log('Call is not on hold'), !1)
        : (console.log('Call not answered'), !1)
      : (console.log('RTCPeerConnection not created'), !1)
  }),
  (StringeeCall.prototype._onRemoteSDP = function () {
    var e,
      t = this,
      r = !1
    0 !== t._remoteSdps.size() &&
      t._pc &&
      ((e = t._remoteSdps.get(t._remoteSdps.allKeys()[0])),
      (null !== t._answeredDeviceId && void 0 !== t._answeredDeviceId) ||
        (t._answeredDeviceId = ''),
      'offer' === e.type && t.fromInternal && (r = !0),
      !t.fromInternal && t.isAnswered && (r = !0),
      'answer' === e.type &&
        t.isAnswered &&
        ((r = !0), (e = t._remoteSdps.get(t._answeredDeviceId))),
      t.isIncomingCall || 'external' !== t.toType || (r = !0),
      r &&
        e &&
        (t._pc.setRemoteDescription(
          e,
          function () {
            ;(t._setRemoteSdpOk = !0),
              t._checkAndAddCandidateFromQueue(),
              'offer' === e.type &&
                t._pc.createAnswer().then(function (e) {
                  t._onCreateLocalSdpSuccess(e)
                }, t._onCreateLocalSdpError)
          },
          function (e) {
            console.log('setRemoteDescription error', e)
          }
        ),
        t._remoteSdps.clear()))
  }),
  (StringeeCall.prototype._getUserMediaError = function (e) {
    this.isIncomingCall
      ? this._callOnEvent('error', { reason: 'GET_USER_MEDIA_ERROR', code: 1e3, moreInfo: e })
      : this.client._sendMessage(
          StringeeServiceType.CALL_STOP,
          { callId: this.callId },
          function (e) {}
        )
  }),
  (StringeeCall.prototype.upgradeToVideoCall = function () {
    function e(e) {
      var t = e.getVideoTracks(),
        n = t[0]
      r._localStream.addTrack(n),
        r._callOnEvent('addlocalstream', r._localStream),
        r._pc.addTrack(n, e),
        r._pc.createOffer(function (e) {
          r._onCreateLocalSdpSuccess(e)
        }, r._onCreateLocalSdpError),
        (r.isVideoCall = !0),
        (r.localVideoEnabled = !0)
    }
    function t(e) {
      r._getUserMediaError(e)
    }
    var r = this
    if (!r.isVideoCall) {
      var n = { audio: !1, video: r._buildVideoConstraints(!0) }
      navigator.mediaDevices.getUserMedia(n).then(e).catch(t)
    }
  }),
  (StringeeCall.prototype._buildVideoConstraints = function (e) {
    return e
      ? !this.videoResolution || {
          width: { exact: this.videoResolution.width },
          height: { exact: this.videoResolution.height }
        }
      : this.isVideoCall && this.videoResolution
        ? {
            width: { exact: this.videoResolution.width },
            height: { exact: this.videoResolution.height }
          }
        : this.isVideoCall
  }),
  (StringeeCall.prototype._checkAndAddCandidateFromQueue = function () {
    if (this.isAnswered && this._pc && this._setRemoteSdpOk) {
      this._answeredDeviceId || (this._answeredDeviceId = this._mapListCandidates.allKeys()[0])
      var e = this._mapListCandidates.get('' + this._answeredDeviceId)
      if (e)
        for (;;) {
          var t = e.pop()
          if (!t) break
          this._pc.addIceCandidate(t)
        }
    }
  }),
  (StringeeCall.prototype._onicecandidate = function (e) {
    if (e.candidate) {
      var t = e.candidate
      this._sendCallSdpCandidate(this.callId, 'candidate', t)
    }
  }),
  (StringeeCall.prototype._ontrack = function (e) {
    ;(this._remoteStream = e.streams[0]), this._callOnEvent('addremotestream', this._remoteStream)
  }),
  (StringeeCall.prototype._onCreateLocalSdpSuccess = function (e) {
    var t = this
    ;(this._localSdp = e),
      this._pc.setLocalDescription(
        e,
        function () {
          t._sendCallSdpCandidate(t.callId, 'sdp', e)
        },
        function (e) {
          console.log('+++++++++ setLocalDescription error', e)
        }
      )
  }),
  (StringeeCall.prototype._onCreateLocalSdpError = function (e) {
    console.log(e)
  }),
  (StringeeCall.prototype._sendCallSdpCandidate = function (e, t, r) {
    var n = { callId: e, type: t, data: r }
    this.client._sendMessage(StringeeServiceType.CALL_SDP_CANDIDATE, n, function (e) {})
  }),
  (StringeeCall.prototype._freeResource = function () {
    if (this._pc) {
      var e = this
      this._pc.close(),
        (this._pc = null),
        this._localStream &&
          this._localStream.getTracks().forEach(function (t) {
            t.stop(), e._localStream.removeTrack(t)
          }),
        (this._localStream = null),
        (this._remoteStream = null)
    }
  }),
  (StringeeCall.prototype.mute = function (e) {
    var t = this
    t._localStream.getAudioTracks().forEach(function (r) {
      e ? ((r.enabled = !1), (t.muted = !0)) : ((r.enabled = !0), (t.muted = !1))
    })
  }),
  (StringeeCall.prototype.enableLocalVideo = function (e) {
    var t = this,
      r = !1
    return (
      t._localStream.getVideoTracks().forEach(function (n) {
        ;(r = !0), (n.enabled = e), (t.localVideoEnabled = e)
      }),
      r
    )
  })
