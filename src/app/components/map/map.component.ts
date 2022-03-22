import { Component, OnInit } from '@angular/core';
import {
  ViewerConfiguration,
  ActionType,
  AcNotification,
} from 'angular-cesium';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { IPost } from '../../models/IPost';
import { PostService } from '../../services/post.service';
import {MatDialog} from '@angular/material/dialog';
import { PopupPostComponent } from '../popup-post/popup-post.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration],
})
export class MapComponent implements OnInit {

  postsArray = new Array<IPost>();

  constructor(
    private viewerConf: ViewerConfiguration,
    private postService: PostService,
    public dialog: MatDialog
  ) {
    viewerConf.viewerOptions = {
      selectionIndicator: false,
      timeline: false,
      infoBox: false,
      fullscreenButton: false,
      baseLayerPicker: false,
      animation: false,
      homeButton: false,
      geocoder: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      useDefaultRenderLoop: true,
      
    };
    
  }
  entities$!: Observable<any>;
  selectedPost!: IPost;
  showDialog = false;
  Cesium = Cesium;

  ngOnInit(): void {
    this.initPostsOnMap();
  }

  initPostsOnMap() {
    this.entities$ = this.postService.getAllPosts().pipe(
      map((posts) => {
        return posts.map((post: IPost) => ({
          id: post.id,
          actionType: ActionType.ADD_UPDATE,
          entity: {
            ...post,
            location: {
              x: post.x_Position,
              y: post.y_Position,
              z: post.z_Position,
            },
          },
        }));
      }),
      mergeMap((entity) => entity)
    );
    
    
  }
  
  showFullPost(post: IPost): void {
    this.showDialog = true;
    this.selectedPost = post;
    
    
  }

}

