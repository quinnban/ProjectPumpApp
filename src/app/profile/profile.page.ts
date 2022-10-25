import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  pictureUrl=null;

  constructor() { }


  async changePicture(){
    const picture = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    this.pictureUrl = picture.webPath;
    console.log(picture);

    const readSecretFile = await Filesystem.readFile({
      path: picture.webPath,
    });
    console.log(readSecretFile);
  }

  ngOnInit() {
    //https://capacitorjs.com/docs/apis/camera#pwa-notes
    //https://capacitorjs.com/docs/web/pwa-elements

    /*
      const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
    imageElement.src = imageUrl;
  };
*/
  }

}
