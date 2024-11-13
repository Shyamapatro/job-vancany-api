import JobListing from "../models/JobListing.js";
import { Sequelize ,Op} from 'sequelize'

const addJobs = async (req, res) => {
  try {
    const {
      title,
      city,
      country,
      company,
      description,
      salary_range,
      date_posted,
      seniority_level,
    } = req.body;
    const newJob = await JobListing.create({
      title,
      city,
      country,
      company,
      description,
      salary_range,
      seniority_level,
      date_posted,
    });
    res.status(201).json(newJob);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error while adding job" });
  }
};

const getAllPositions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      city = "",
      country = "",
      sortBy = "seniority_level",
    } = req.query;

    const validLimit = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
    const offset = (parseInt(page, 10) - 1) * validLimit;

    const allowedSortFields = ["seniority_level", "salary_range"];
    const sortField = allowedSortFields.includes(sortBy)
      ? sortBy
      : "seniority_level";
      console.log("................",sortField)
    const order = "DESC";

    const whereConditions = {};

    if (city) {
      whereConditions.city = { [Op.like]: `%${city}%` };
    }
    if (country) {
      whereConditions.country = { [Op.like]: `%${country}%` };
    }

    const jobs = await JobListing.findAndCountAll({
      where: whereConditions,
      limit: validLimit,
      offset,
      order: 
        sortField === 'seniority_level'
          ? [[Sequelize.literal(`CASE seniority_level 
                                    WHEN 'Junior' THEN 1 
                                    WHEN 'Mid' THEN 2 
                                    WHEN 'Senior' THEN 3 
                                    ELSE 4 END`), order]]
          : sortField === 'salary_range'
          ? [
              [
                Sequelize.literal(
                  `CAST(SUBSTRING_INDEX(salary_range, '-', 1) AS UNSIGNED)`
                ),
                order
              ]
            ]
          : [[sortField, order]],
    });

    res.status(200).json({
      totalItems: jobs.count,
      totalPages: Math.ceil(jobs.count / validLimit),
      currentPage: parseInt(page, 10),
      jobs: jobs.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while retrieving job listings." });
  }
};


const getPositionById = async (req, res) => {
  const { id } = req.params;
  try {
    const position = await JobListing.findByPk(id);

    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }

    res.json(position);
  } catch (err) {
    res.status(500).json({ message: "Error fetching position", error: err.message });
  }
};

export default { getPositionById, addJobs, getAllPositions };
