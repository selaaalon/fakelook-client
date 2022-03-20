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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ViewerConfiguration],
})
export class MapComponent implements OnInit {

  constructor(
    private viewerConf: ViewerConfiguration,
    private postService: PostService
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
    // this.initList();
    this.initPostsOnMap();
  }

  initPostsOnMap() {
    this.entities$ = this.postService.getAllPosts(sessionStorage.getItem('token')!).pipe(
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

  // initList() {
  //   this.initPostsOnMap();
  // }
  
  showFullPost(post: IPost): void {
    this.showDialog = true;
    this.selectedPost = post;
  }

}

