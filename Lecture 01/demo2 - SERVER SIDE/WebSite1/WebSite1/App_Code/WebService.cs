using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{

    public WebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }

    [WebMethod]
    public string InsertPlace(string placeName, string lati, string longi, string address)
    {
        //   string strCon = @"Data Source=.;Initial Catalog=DBUsers;Integrated Security=True";
        string strCon = ConfigurationManager.ConnectionStrings["LIVEDNS"].ConnectionString;
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand comm = new SqlCommand(
             " INSERT INTO TBPlaces(PlaceName, PlaceLati, PlaceLongi, PlaceAddress) " + 
            $" VALUES('{placeName}','{lati}','{longi}','{address}') "
            , con);
        comm.Connection.Open();
        int res = comm.ExecuteNonQuery();
        comm.Connection.Close();

        return new JavaScriptSerializer().Serialize(res);
    }

}