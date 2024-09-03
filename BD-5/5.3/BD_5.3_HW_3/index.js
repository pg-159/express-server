let express = require("express");
let app = express();
let PORT = 3000;
let { sequelize } = require("./lib/index");
let { employee, company } = require("./models/company.model");
app.use(express.json());

let companiesData = [
  {
    id: 1,
    name: "Tech Innovators",
    industry: "Technology",
    foundedYear: 2010,
    headquarters: "San Francisco",
    revenue: 75000000,
  },
  {
    id: 2,
    name: "Green Earth",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Portland",
    revenue: 50000000,
  },
  {
    id: 3,
    name: "Innovatech",
    industry: "Technology",
    foundedYear: 2012,
    headquarters: "Los Angeles",
    revenue: 65000000,
  },
  {
    id: 4,
    name: "Solar Solutions",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Austin",
    revenue: 60000000,
  },
  {
    id: 5,
    name: "HealthFirst",
    industry: "Healthcare",
    foundedYear: 2008,
    headquarters: "New York",
    revenue: 80000000,
  },
  {
    id: 6,
    name: "EcoPower",
    industry: "Renewable Energy",
    foundedYear: 2018,
    headquarters: "Seattle",
    revenue: 55000000,
  },
  {
    id: 7,
    name: "MediCare",
    industry: "Healthcare",
    foundedYear: 2012,
    headquarters: "Boston",
    revenue: 70000000,
  },
  {
    id: 8,
    name: "NextGen Tech",
    industry: "Technology",
    foundedYear: 2018,
    headquarters: "Chicago",
    revenue: 72000000,
  },
  {
    id: 9,
    name: "LifeWell",
    industry: "Healthcare",
    foundedYear: 2010,
    headquarters: "Houston",
    revenue: 75000000,
  },
  {
    id: 10,
    name: "CleanTech",
    industry: "Renewable Energy",
    foundedYear: 2008,
    headquarters: "Denver",
    revenue: 62000000,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await company.bulkCreate(companiesData);
    res.status(200).json({ message: "database seeding successful" });
  } catch (error) {
    re.status(500).json({ error: error.message });
  }
});

//Exercise 1: Fetch all companies
async function fetchAllCompanies() {
  let companies = await company.findAll();
  return { companies };
}
app.get("/companies", async (req, res) => {
  try {
    let response = await fetchAllCompanies();
    if (response.companies.length === 0) {
      return res.status(404).json("No Company Found.");
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
});

// Exercise 2: Add a new company in the database
async function addNewCompany(data){
  let newCompany = await company.create(data);
  return {message:'company added successfully',newCompany};
}
app.post('/companies/new', async (req, res) => {
  try {
    let newCompany = req.body.newCompany;
    let response = await addNewCompany(newCompany);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Update companies information
async function updateCompanyById (data, id){
  let updateCompany = await company.findOne({where: {id}});
  if (!updateCompany) return {};
    updateCompany.set(data);
  let updatedCompany = await updateCompany.save();
  return {message: 'company updated successfully', updatedCompany}
}
app.post('/companies/update/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newCompanyData  = req.body;

    let response = await updateCompanyById (newCompanyData, id)
    if (!response.message){
      res.status(404).json({message: 'Company not found.'})
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

// Exercise 4: Delete an company from the database
async function deleteCompanyById(id){
  let destroyedCompany = await company.destroy({where: {id}});
  if (destroyedCompany === 0) return {};
  return {message: 'company record deleted!'}
}
app.post("/companies/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deleteCompanyById(id);
    if (!response.message){
      return res.status(404).json({message: 'company not found'})
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});