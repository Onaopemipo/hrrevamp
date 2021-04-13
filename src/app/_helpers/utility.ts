export const Util = {

    getDomain(env: string): string {


        if (env === 'local') {
   
        }

        if (env === 'development') {
            return 'http://51.124.39.23:8008';
        }

        if (env === 'companydevelopment') {

        }

        if (env === 'staging') {

        }

        if (env === 'demo') {

        }

        if (env === 'production') {
            return 'http://51.124.39.23:8008';
        }


        if (env === 'localmain') {
       
        }

        if (env === 'developmentmain') {
        
        }

        if (env === 'companydevelopmentmain') {

        }

        if (env === 'stagingmain') {

        }

        if (env === 'demomain') {

        }

        if (env === 'productionmain') {

        }

    },

};
