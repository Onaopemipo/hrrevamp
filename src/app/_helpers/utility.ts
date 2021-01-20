export const Util = {

    getDomain(env: string): string {


        if(env == 'local')
        {
         //  return "http://40.91.215.240/smartaceapis";
        //   return "http://192.168.0.102:61680/"
            // return "http://192.168.0.102/localsmartaceliteapi"
         //return "http://localhost/localsmartaceliteapi";
            return "https://localhost:44381";
        }

        if(env == 'development')
        {
            var baseURL = JSON.parse(localStorage.getItem('baseUrl'));
        
           // console.log(baseURL)
            return baseURL;
            // return "http://40.91.215.240/smartaceapis";
        }

        if(env == 'companydevelopment')
        {

        }

        if(env == 'staging')
        {

        }

        if(env == 'demo')
        {

        }

        if(env == 'production')
        {   
            var baseURL = JSON.parse(localStorage.getItem('baseUrl'));
     
         //   console.log(baseURL)
            return baseURL;
            //return "https://lagminhealth-api.azurewebsites.net"
            // return "http://40.91.215.240";
            // return "http://40.91.215.240";
            //return "https://devtestbed.azurewebsites.net";
            //return "http://192.168.100.112/HRIS";
        }


        if(env == 'localmain')
        {
            return "http://localhost:8000/api/";
        }

        if(env == 'developmentmain')
        {
            return "https://qatestbed.azurewebsites.net/api/mobile/";
        }

        if(env == 'companydevelopmentmain')
        {

        }

        if(env == 'stagingmain')
        {

        }

        if(env == 'demomain')
        {

        }

        if(env == 'productionmain')
        {
            
        }

    }

}
