import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchService } from './search.service';
import { ArtistService } from './artist.service';
import { WebplayerComponent } from './webplayer/webplayer.component';
import { SafePipe } from './safe.pipe';
import { AlbumsComponent } from './albums/albums.component';
import { RelatedArtistsComponent } from './related-artists/related-artists.component';
import { EventsComponent } from './events/events.component';
import { BioComponent } from './bio/bio.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    WebplayerComponent,
    SafePipe,
    AlbumsComponent,
    RelatedArtistsComponent,
    EventsComponent,
    BioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [SearchService, ArtistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
