# MockBuilder

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.10.

## Getting started

Start by adding the mockinator dependency to your project. Mostly you should only need it as a dev dependency, but make sure to modify the commaand in case you need it as a production dependency

```
npm install mockinator --save-dev 
```

After adding the mockinator dependency to your project, follow the below outlined steps to integrate it with your application -

1. In the root angular.json/project.json file, update the assets section of the build target to
    ```json  
    {
      "assets": [
        {
          "glob": "mockServiceWorker.js",
          "input": "node_modules/mock-builder/assets",
          "output": "/"
        },
        {
          "glob": "**/*",
          "input": "node_modules/monaco-editor",
          "output": "/assets/monaco"
        }
      ]
   }
   ```
2. For standalone applications (Angular >=17)

   - Update the providers in `app.config.ts` file
      ```typescript
     import { ApplicationConfig, importProvidersFrom } from '@angular/core';
     import { provideRouter } from '@angular/router';
     import { routes } from './app.routes';
     import { provideHttpClient } from '@angular/common/http';
     import { provideAnimations } from '@angular/platform-browser/animations';
     import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

      export const appConfig: ApplicationConfig = {
          providers: [
              provideHttpClient(),
              provideAnimations(),
              importProvidersFrom(MonacoEditorModule.forRoot())
          ]
      }
      ```
   - Update the `main.ts` file 
     ```typescript	
      import { bootstrapApplication } from '@angular/platform-browser';
      import { appConfig } from './app/app.config';
      import { AppComponent } from './app/app.component';
      import { startMockerWorker } from 'mock-builder';
      
      startMockerWorker().then(() => {
          bootstrapApplication(AppComponent, appConfig).catch((err) => console.err(err)); 
      });
     ```
3. For applications with defined modules (Angular <17)
   - Update the imports in `app.module.ts` file
        ```typescript
        @NgModule({
            imports: [
               HttpClientModule,
               BrowserAnimationsModule,
               MonacoEditorModule.forRoot()
            ]
        })
        ```
   - Update the `main.ts` file
     ```typescript
     import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
     import { AppModule } from './app/app.module';
     import { startMockerWorker } from 'mock-builder';

     startMockerWorker().then(() => {
         platformBrowserDynamic.bootstraapModule(AppModule).catch((err) => console.err(err));
     });
     ```
