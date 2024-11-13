import { DataTypes } from "sequelize";
import { sequelize } from "../../dbConnection.js";

const JobListing = sequelize.define(
  "JobListing",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seniority_level: {
      type: DataTypes.ENUM("Junior", "Mid", "Senior", "Lead", "Principal"),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    description: {
      type: DataTypes.TEXT, 
      allowNull: false,
      
    },
    salary_range: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    date_posted: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "job_listings",
  }
);

export default JobListing;
