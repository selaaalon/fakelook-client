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

  public bla = JSON.stringify;
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

//     this.entities$ = this.postService.getAllPosts(sessionStorage.getItem('token')!).pipe(
//       map((posts) => {
//         let post = {} as IPost;
//         post.id=15;
//         post.description="dsfkljds"
//         post.imageSorce="sdfkj"
//    //     post.location={x:4439427.592835937,y:2788934.2439839416,z:3620170.526302757}
//         post.userId=1;
        // post.x_Position=4439646.379032415
        // post.y_Position = 3109874.6318978276;
        // post.z_Position = 3350106.354895249
//         posts.push(post)
//         return posts.map((post) => {
//     //       post.location = {x:4439427.592835937, y:2788934.2439839416, z:3620170.526302757};
// //          post.location = Cesium.Cartesian3.fromDegrees(35,32);
//           return {
//               id: post.id?.toString(),
//               actionType: ActionType.ADD_UPDATE,
//               entity: {...post,location:{
//                 x:post.x_Position,
//                 y:post.y_Position,
//                 z:post.z_Position
//               }},
//           }
//           });
//       }),
//       mergeMap((entity) => entity)
//     );
  }
  initPostsOnMap() {
    this.entities$ = this.postService.getAllPosts(sessionStorage.getItem('token')!).pipe(
      map((posts) => {
        // let post = {} as IPost
        // post.id=15;
        // post.description=""
        // post.imageSorce=""
        // post.userId=1
        // post.x_Position=4439646.379032415
        // post.y_Position = 3109874.6318978276;
        // post.z_Position = 3350106.354895249
        // posts.push(post)
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

  initList() {
    this.initPostsOnMap();
  }
  
  showFullPost(post: IPost): void {
    this.showDialog = true;
    this.selectedPost = post;
  }
  closeDialog(): void {
    this.showDialog = false;
  }


}

