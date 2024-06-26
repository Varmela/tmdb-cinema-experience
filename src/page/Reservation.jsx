import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./reservation.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getAllMovies } from "../api";
import moment from "moment";
export const schema = z.object({
  user_id: z.string(),
  name: z.string().min(2, { message: "Name has to be at least 2 characters" }),
  email: z.string().email({ message: "Not a valid email" }),
  movieTitle: z
    .string()
    .nullable()
    .refine((val) => val !== "", {
      message: "You have to select the movie",
      path: ["title"],
    }),
  date: z.string().transform((value) => moment(value).format("MMM-Do-YY")),
  time: z.string().nullable(),
  theater: z
    .string()
    .nullable()
    .refine((val) => val !== "", {
      message: "You have to select a theater",
      path: ["theater"],
    }),
  termsAndConditions: z.boolean(),
});

const Reservation = () => {
  const nav = useNavigate();
  const { data, isPending, isError } = useQuery({
    queryKey: ["select-movie"],
    queryFn: getAllMovies,
  });

  const userId = localStorage.getItem("user_id");

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      user_id: userId || "",
      name: "",
      email: "",
      movieTitle: "",
      date: "",
      time: "",
      theater: "",
      termsAndConditions: false,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/reservations",
        data
      );
      console.log("Reservation successful:", response.data);
      nav("/ticket");
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  return (
    <div className="reservation-body">
      <form className="reservation" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="reserve-title">Reservation</h1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <TextField
            label="User_ID"
            value={userId || ""}
            variant="outlined"
            disabled
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.name}
                label="Name"
                type="text"
                variant="outlined"
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.email}
                label="Email"
                type="email"
                variant="outlined"
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="movieTitle"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.movieTitle} variant="outlined">
                <InputLabel id="movieTitle">Movie Title</InputLabel>
                <Select {...field} labelId="movieTitle" label="Movie Title">
                  {data?.map((movie) => (
                    <MenuItem key={movie.id} value={movie.title}>
                      {movie.title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.movieTitle && (
                  <FormHelperText>{errors.movieTitle.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.date}
                label="Date"
                type="date"
                variant="outlined"
                helperText={errors.date?.message}
              />
            )}
          />

          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.time}
                label="Time"
                type="time"
                variant="outlined"
                helperText={errors.time?.message}
              />
            )}
          />

          <Controller
            name="theater"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.theater} variant="outlined">
                <InputLabel id="theater">Theater</InputLabel>
                <Select {...field} labelId="theater" label="Theater">
                  <MenuItem value="Theater-1">Theater 1</MenuItem>
                  <MenuItem value="Theater-2">Theater 2</MenuItem>
                  <MenuItem value="Theater-3">Theater 3</MenuItem>
                </Select>
                {errors.theater && (
                  <FormHelperText>{errors.theater.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="termsAndConditions"
            control={control}
            render={({ field }) => (
              <FormControl
                error={!!errors.termsAndConditions}
                variant="outlined"
              >
                <FormControlLabel
                  {...field}
                  control={<Checkbox {...field} />}
                  label="Accept terms and conditions"
                />
                {errors.termsAndConditions && (
                  <FormHelperText>
                    {errors.termsAndConditions.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Box>

        <Button variant="contained" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading.." : "Submit"}
        </Button>

        <Link style={{ color: "red" }} to="/">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default Reservation;
