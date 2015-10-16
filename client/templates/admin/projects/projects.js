Template.layout.onRendered(function(){
    this.$('.datetimepicker').datetimepicker();
});

Template.add_project.events({
        'submit .add_project_form' : function(){
            var name = event.target.name.value;
            var type = event.target.type.value;
            var client = event.target.client.value;
            var description = event.target.description.value;
            var projectDate = event.target.projectDate.value;
            var file = $('#projectImage').get(0).files[0];
            
            if(file){
                fsFile = new FS.File(file);
        	    ProjectImages.insert(fsFile, function(err, result){
            		if(!err){
            			var projectImage = '/cfs/files/ProjectImages/' + result._id;
    
            			// Insert Project
            			Projects.insert({
            				name: name,
            				description: description,
            				type: type,
            				client: client,
            				projectDate: projectDate,
            				projectImage: projectImage
            			});
            		}
        	    });
            } else{
                    // Insert Project
    			    Projects.insert({
    				name: name,
    				description: description,
    				type: type,
    				client: client,
    				projectDate: projectDate
    			});
           }
           
            FlashMessages.sendSuccess('Project Added');
            Router.go('/admin/projects');

            return false;
       }

});

Template.edit_project.events({
    'submit .edit_project_form' : function(){
            var name = event.target.name.value;
            var type = event.target.type.value;
            var client = event.target.client.value;
            var description = event.target.description.value;
            var projectDate = event.target.projectDate.value;
            var file = $('#projectImage').get(0).files[0];
            
            if(file){
            	fsFile = new FS.File(file);
            	ProjectImages.insert(fsFile, function(err, result){
            	if(!err){
            			var projectImage = '/cfs/files/ProjectImages/' + result._id;
    
            			//Update Project
            			Projects.update({
                            _id:this._id
                        },{
                            $set:{
                                name: name,
                                description: description,
                                type: type,
                                client: client,
                                projectDate: projectDate,
                                productImage: productImage,
                            }
                        });
            		}
            	});
                } else {
                    
            	// Update Project
                Projects.update({
                    _id:this._id
                },{
                    $set:{
                        name: name,
                        description: description,
                        type: type,
                        client: client,
                        projectDate: projectDate
                    }
                });
            }

            FlashMessages.sendSuccess('Project Updated');
            Router.go('/admin/projects');
    
            return false;
    }
});