using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for WSUsers
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class WSUsers : System.Web.Services.WebService
{

    public WSUsers()
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
    public string Login(string name, string pass)
    {
        User u = null; 
        string conStr = ConfigurationManager.ConnectionStrings["LIVEDNS"].ConnectionString;
        SqlConnection con = new SqlConnection(conStr);
        SqlCommand com = new SqlCommand(" SELECT * " +
                                        " FROM TBUsers " +
                                       $" WHERE Name = '{name}' AND Pass = '{pass}' ", con);
        con.Open();
        SqlDataReader reader = com.ExecuteReader();
        if (reader.Read())
        {
            u = new User()
            {
                ID = int.Parse(reader["ID"].ToString()),
                Name = reader["Name"].ToString(),
                Pass = reader["Pass"].ToString()
            };
        }
        con.Close();
        return new JavaScriptSerializer().Serialize(u);
    }

}

class User
{
    public int ID { get; set; }
    public string Name { get; set; }
    public string Pass { get; set; }
}
