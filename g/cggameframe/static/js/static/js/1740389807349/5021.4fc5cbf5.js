"use strict";(globalThis.webpackChunkcrazygames_gameframe=globalThis.webpackChunkcrazygames_gameframe||[]).push([[5021],{75021:(e,r,t)=>{t.r(r),t.d(r,{default:()=>p});var s=t(9950),n=t(88031),a=t(14953),o=t(41160),i=t(5424),c=t(27608),l=t(11805),g=t(25974),u=t(25686),h=t(14646),d=t(44414);const v={textDecoration:"underline",fontWeight:"bolder",color:"#FFF"};class m extends s.Component{constructor(e){super(e),this.config=void 0,this.config=(0,i.lZ)()}render(){return this.isRecentBrowser()?(0,d.jsx)(h.A,{showCloseText:!1,message:this.createOverlayMessageForRecentBrowser()}):(0,d.jsx)(h.A,{showCloseText:!1,message:this.createOverlayMessage(),leaveButtonMessage:this.createLeaveButtonMessage(),leaveButtonUrl:this.createLeaveButtonUrl()})}isRecentBrowser(){var e,r;const t=(0,o.L7)();return!!((0,a.gm)()&&parseInt((null===(e=t.rawBrowser)||void 0===e?void 0:e.version)||"0")>90)||!!((0,a.H8)()&&parseInt((null===(r=t.rawBrowser)||void 0===r?void 0:r.version)||"0")>90)}createOverlayMessage(){return(0,d.jsx)("div",{style:{textAlign:"center"},children:(0,d.jsx)(u.A,{id:"error.unity.browserNotSupported",values:{gameName:this.config.gameName}})})}createOverlayMessageForRecentBrowser(){return(0,d.jsx)("div",{style:{textAlign:"center"},children:(0,d.jsx)(u.A,{id:"error.unity.browserWithoutWebGL",values:{link:(0,d.jsx)("a",{href:"https://get.webgl.org/webgl2/enable.html",target:"_blank",rel:"noopener noreferrer",style:v,children:(0,d.jsx)(u.A,{id:"error.unity.browserWithoutWebGLLinkLabel"})})}})})}createLeaveButtonMessage(){return(0,d.jsx)("div",{children:(0,d.jsx)(u.A,{id:"error.generic.playOurOtherCatGames",values:{category:this.config.category}})})}createLeaveButtonUrl(){const e=this.config;if(!e.categoryLink)return"https://www.crazygames.com";const r=(0,c.A)(),t=l.a.UnityUnavailableRedirect;return g.A.utmUrl(e.categoryLink,r,t)}}const w=(0,n.A)(m);class y extends s.Component{render(){const{device:e,...r}=this.props;return this.isIE()?null:(0,d.jsx)(w,{...r})}isIE(){const{device:e}=this.props;return e.isIE}}const p=(0,n.A)(y)}}]);