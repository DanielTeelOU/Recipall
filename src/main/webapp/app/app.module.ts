import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { RecipallSharedModule } from 'app/shared/shared.module';
import { RecipallCoreModule } from 'app/core/core.module';
import { RecipallAppRoutingModule } from './app-routing.module';
import { RecipallHomeModule } from './home/home.module';
import { RecipallEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    RecipallSharedModule,
    RecipallCoreModule,
    RecipallHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    RecipallEntityModule,
    RecipallAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class RecipallAppModule {}
