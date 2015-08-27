/**
 * 
 */
define([ "module", "jquery", "message-bus", "map", "i18n", "customization",  "portal-string-utils", 'redd_projects' ,"jquery-easing" , "features" ], 
		function(module, $, bus, map, i18n, customization ) {
	
	var reddProjectsVisibile =  true;
	var config = module.config();
	
	var serverUrl 	= customization['info.serverUrl'] ;
	var wmsUri 		= customization['info.wmsUri'] ;
	
	// popover html content
	var popoverHtml = $( '<div class="redd_project"><div class="popover fade top in popover_province" data-style="redd_projects_tooltip" role="tooltip">'
			+'<div class="arrow"></div>'
			+'<div class="popover-content collapsed"><i class="fa fa-tree" ></i></div>'
			+'<div class="popover-content expanded">'
			+'<h3 class="popover-title"></h3>'
			
			+'<div class="project project_1"><i class="fa fa-circle"></i> '+i18n['redd_project_1_short_label']+'</div>'
			+'<div class="project project_2"><i class="fa fa-circle"></i> '+i18n['redd_project_2_short_label']+'</div>'
			+'<div class="project project_3"><i class="fa fa-circle"></i> '+i18n['redd_project_3_short_label']+'</div>'
			+'<div class="project project_4"><i class="fa fa-circle"></i> '+i18n['redd_project_4_short_label']+'</div>'
			+'<div class="project project_5"><i class="fa fa-circle"></i> '+i18n['redd_project_5_short_label']+'</div>'
			+'<div class="project project_6"><i class="fa fa-circle"></i> '+i18n['redd_project_6_short_label']+'</div>'
			+'<div class="project project_7"><i class="fa fa-circle"></i> '+i18n['redd_project_7_short_label']+'</div>'
			+'<div class="project project_8"><i class="fa fa-circle"></i> '+i18n['redd_project_8_short_label']+'</div>'
			+'<div class="project project_9"><i class="fa fa-circle"></i> '+i18n['redd_project_9_short_label']+'</div>'
			+'<div class="project project_10"><i class="fa fa-circle"></i> '+i18n['redd_project_10_short_label']+'</div>'
			+'<div class="project project_11"><i class="fa fa-circle"></i> '+i18n['redd_project_11_short_label']+'</div>'
			+'<div class="project project_12"><i class="fa fa-circle"></i> '+i18n['redd_project_12_short_label']+'</div>'
			+'<div class="project project_13"><i class="fa fa-circle"></i> '+i18n['redd_project_13_short_label']+'</div>'
			+'<div class="project project_14"><i class="fa fa-circle"></i> '+i18n['redd_project_14_short_label']+'</div>'
			+'<div class="project project_15"><i class="fa fa-circle"></i> '+i18n['redd_project_15_short_label']+'</div>'
			+'<div class="project project_16"><i class="fa fa-circle"></i> '+i18n['redd_project_16_short_label']+'</div>'
			
			+'</div>'
			+'</div>'
			+'</div>' );

	var markerHtml = $( '<div class="redd_project_marker"><img src="static/img/Map-Marker-Ball-Left-Azure-icon.png" width="20"/></div>' );
//	var markerHtml = $( '<div class="redd_project_marker"><i class="fa fa-map-pin"></i></div>' );
	
	bus.listen('layers-loaded', function(e){

		//redd project layers
		map.events.register("movestart", this, function (e) {
			$('.redd_project').stop().hide();
			$('.redd_project_marker').stop().hide();
		});

		map.events.register("moveend", this, function (e) {
			$('.redd_project').stop().hide();
			$('.redd_project_marker').stop().hide();
			var layer = map.getLayer( 'province_center' );

			layer.refresh( {force:true} );
		});
		
	});
	
	bus.listen("layer-visibility", function(event, layerId, visible) {
		if( layerId === 'province_center' ){
			
			$('.redd_project').stop().remove();
			$('.redd_project_marker').stop().remove();
			
			reddProjectsVisibile = visible;
			
			var layer = map.getLayer( 'province_center' );
			layer.refresh( {force:true} );
		}
	});
	
	bus.listen( "wfs-feature-added", function( event , object ){

		var feature = object.feature; 
		var id 		= feature.attributes.province_c;

		if( hasPopover(id) ){
			
			$( '.feature_' + id ).stop().remove();

			var popover = createPopover( feature );
			var marker 	= createMarker( feature );

			if( reddProjectsVisibile ){
//				var h =  popover.innerHeight() ;
//				
//				var popoverContent = popover.find('.popover');
//				popoverContent.css( {top: h+'px',height: '0px' , bottom:'0px' } );
//				popoverContent.stop().animate( {"top": "0px", "height": h+"px" } , 500 ,'easeInOutBack' ); 
				var i = marker.find( 'img' );
				var h =  i.innerHeight() ;
				console.log( h );
				i.css( {top: h+'px',height: '0px' , bottom:'0px' } );
				i.stop().animate( {"top": "0px", "height": h+"px" } , 500 ,'easeInOutBack' ); 
				
				
				
//				h.css( {'height':'0px','width':'0px'} ) ;
				
//				popoverContent
//				.css({
//					"height": (h+140)+"px" , 
//					"width": (w+100)+"px", 
//					"left":"-50px" , 
//					"top":"-140px" , 
//					"font-size":"12px" , 
//					'background-color': 'rgba(4, 118, 210, 1);'
//				});
				
				
			} else {
				marker.stop().hide();
			}
			
		}
		
	});
	
	
	var hasPopover = function( id ){
		var province = REDDProjects.provinces[id];
		return province != null;
	};
	
	var createMarker = function( feature ){
		var id = feature.attributes.province_c;
		
		var province = REDDProjects.provinces[id];
		if( province ){
			var marker = markerHtml.clone();
			
			var geom 	= feature.geometry;
			var point 	= map.getViewPortPxFromLonLat( new OpenLayers.LonLat(geom.x, geom.y) );
			
			marker.addClass( 'feature_'+id );
			
			$('body').append( marker );
			
			var h =  marker.innerHeight();
			var w =  marker.innerWidth();
			marker.css( 'top' , ( point.y - (20) ) + 'px' );
			marker.css( 'left' , ( point.x - (10) )+ 'px'  );
			
			marker.on('mouseenter',function(e){
				showPopover( e , id );
			});
			
			return marker;
		}
	};
	
	var createPopover = function( feature ){
		var id = feature.attributes.province_c;
		
		var province = REDDProjects.provinces[id];
		if( province ){
			var popover = popoverHtml.clone();
			var geom 	= feature.geometry;
			var point 	= map.getViewPortPxFromLonLat( new OpenLayers.LonLat(geom.x, geom.y) );
			
			popover.addClass( 'feature_'+id );
			
			popover.find( '.popover-title' ).html( feature.attributes.name );
			
			for( var i in province.projects ){
				var proj = province.projects [i];
				popover.find( '.project_' + proj ).show();
			}
			
//			popover.find( '.popover-content.collapsed' ).html( province.projects.length + ' ' + i18n['projects'] );
			popover.find( '.popover-content.expanded' ).hide();
			
			
			$('body').append( popover );
			
			
			var h =  popover.innerHeight();
			var w =  popover.innerWidth();
			popover.css( 'top' , ( point.y - (h-45) ) + 'px' );
//			popover.css( 'top' , ( point.y - (h-5) ) + 'px' );
			popover.css( 'left' , ( point.x +5 )+ 'px'  );
			
			popover.hide();
//			var bindEvents = function(){
//				var popoverContent = popover.find( '.popover' );
				
				
//				var arrow = popover.find('.popover .arrow');
//				arrow.on('mouseenter', onmouseover);
//				arrow.on('mouseleave', onmouseout);
			popover.find('.popover').on('mouseleave', function(e){
				hidePopover( e , id );
			});
			
			popover.find('.popover').on('click', function(e){
				
				Features.getFeatureInfo(  
						true,
						'unredd:country,unredd:province', 
						'(name,area,info_file)(name,area,info_file,province_c)',
						Math.round( point.x ), Math.round( point.y ), map.size.h , map.size.w ,
						 map.getExtent().toBBOX()
				 );
				
			});
//				popover.find('.popover').mouseover(onmouseover);
				
				
//			};
//			bindEvents();
			
//			popoverContent.mouseout( function(e){
//				popoverContent.stop().animate( {"height": h+"px" , "width": w+"px" } , 500 ,'easeInOutBack' );
//				setTimeout( function(){
//					popover.find( '.popover-content.collapsed' ).fadeIn( 150 );
//					popover.find( '.popover-content.expanded' ).hide();
//				}, 350 );
//				
//			});

			return popover;
		}
	
	};
	
	var showPopover =  function(e, id){
		e.preventDefault();
		e.stopPropagation();
		$('.redd_project').stop().hide();
		var popover = $( 'body' ).find('.redd_project.feature_'+id);
		var popoverContent = popover.find( '.popover' );
//		popover.find('.popover').off('mouseenter',onmouseover);
//		popover.find('.popover').on('mouseleave',onmouseout);
		
//		popover.find('.popover').off('mouseover',onmouseover);
//		popover.find('.popover').on('mouseout',onmouseout);
		
		popover.css( {'z-index':'2200','height':'0px','width':'0px'} ) ;
		popover.show( 5 );
		popover.find( '.popover-content.collapsed' ).hide( 0 );
		
//		popoverContent
//		.css({
//			"height": (h+140)+"px" , 
//			"width": (w+100)+"px", 
//			"left":"-50px" , 
//			"top":"-140px" , 
//			"font-size":"12px" , 
//			'background-color': 'rgba(4, 118, 210, 1);'
//		});
		popoverContent
		.animate({
			"height": (170)+"px" , 
			"width": (140)+"px", 
			"left":"-70px" , 
			"top":"-170px" , 
			'background-color': 'rgba(4, 118, 210, .95);'
		} , 200 );
//				} , 200 ,'easeInOutElastic' );
		
		
//		setTimeout( function(){
			popover.find( '.popover-content.expanded' ).show(  );
			
//		}, 100 );
		
	}; 
	
	var hidePopover 	= function(e , id){
		e.preventDefault();
		var popover = $( 'body' ).find('.redd_project.feature_'+id);
		var popoverContent = popover.find( '.popover' );

//		popover.find('.popover').off('mouseleave',onmouseout);
//		popover.find('.popover').on('mouseenter',onmouseover);
//		popover.find('.popover').off('mouseout',onmouseout);
//		popover.find('.popover').on('mouseover',onmouseover);
		
		
//		popover.find( '.popover-content.expanded' ).hide( 0 );
//		
		popoverContent
		.animate({
			"height": "0px" , 
			"width": "0px", 
			"left":"0px" , 
			"top":"0px" , 
			'background-color': 'rgba(4, 118, 210, 0.6);'
		} , 150 );
//		} , 70 ,'easeInOutQuad' );
		
		popover.fadeOut( 100 );
//		setTimeout( function(){
//			popover.find( '.popover-content.collapsed' ).show( 70 );
			popover.css( {'z-index' : '900'} ) ;
			
//		}, 100 );
	};
	
});
	
