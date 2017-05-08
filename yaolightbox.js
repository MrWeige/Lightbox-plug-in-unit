(function(){
	var yao = function(){
		var self = this;
			this.lightImgs = document.querySelectorAll('.lightImg')   //获取所有的图片形成类数组
			this.lightImgsArray = Array.prototype.slice.call(this.lightImgs)//把类数组转化成图片数组

			this.place=document.getElementById("showpicture")      //获取显示图片位置
			this.displaymask=document.getElementById("mask")
			this.displayCloser=document.getElementById("closer")
			this.displayImgBox=document.getElementById("img-box")
			this.prevBtn=document.querySelector('.prev-btn')  //上一张按钮
		  	this.nextBtn=document.querySelector('.next-btn')//下一张按钮

			this.curImgIndex = 0; //当前图片的位置
			this.curGroup ;			//当前属于哪个组
			this.curGroupName = '' //当前组名
			this.curGrouplength=0; //获取当前组图片的长度

		  	this.lightImgsArray.forEach(function(item){      //把所有图片绑定onclick
		  		item.addEventListener('click',function(){
					self.show(this);  //为了显示当前图片
					curGroupName = this.getAttribute('group') //获取当前对象的组别
					curGroup = self.getElementsByAttribute('group', curGroupName);        //******
					curImgIndex = curGroup.indexOf(this)						//******

					curGrouplength=curGroup.length; //获取当前组的长度
					//这里的this是当前的img
				})
		  	})

		  	this.nextBtn.addEventListener('click',function(){       //监听nextBtn是否被点击
		  		document.onselectstart = function(){
  		               return false;                         // 按得过快，双击解决变蓝**********
  		             }
				if(curImgIndex!=curGrouplength-1)      //判断当前图片位置是否超过该组图片的长度
				{
					curImgIndex=curImgIndex+1;
					var nextPic=curGroup[curImgIndex];	
					self.show(nextPic);			
				}
			})
		  	this.prevBtn.addEventListener('click',function(){
		  		document.onselectstart = function(){
		  			return false;
		  		}
				if(curImgIndex!=0){                                  //判断当前图片位置是否小于0
					curImgIndex=curImgIndex-1;
					var nextPic=curGroup[curImgIndex];	
					self.show(nextPic);			
				}
			})	 		 	

		  	this.displaymask.addEventListener('click',function(e){
		  		self.closemask(e);
		  	})

		  }

		  yao.prototype = {
		  	show: function(whichpic) {
					var current_pic_source=whichpic.getAttribute("src");   //显示所有东西
					this.showmask();  //打开遮罩和图片区
					this.showpic(current_pic_source);
				},
				showpic: function(address){
					this.place.setAttribute("src",address);
				},
				showmask:function(){
					this.displaymask.style.display="block";
				},

				closemask: function(e){
					if(e.target == this.displayImgBox || e.target == this.displayCloser){   //********
						this.displaymask.style.display="none";
					}
				},

				getElementsByAttribute : function (attribute, context) {
				  var nodeList = document.getElementsByTagName('*');
				  var nodeArray = [];
				  var iterator = 0;
				  var node = null;

				  while (node = nodeList[iterator++]) {
				    if (node.hasAttribute(attribute) && node.getAttribute(attribute) == context) nodeArray.push(node);
				  }
				  return nodeArray;
				}
			}
			window['yao'] = yao;
		})()