import { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { SocketContext } from "../context/SocketContext";

const MoviesChart = () => {
    const { movies } = useContext(SocketContext);

    const canvasOptions = {
        type: "horizontalBar",
        data: {
            labels: movies.map((movie) => movie.name),
            datasets: [
                {
                    label: "# of Votes",
                    data: movies.map((movie) => movie.votes),
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
            maintainAspectRatio: true,
        },
    };

    return (
        <Bar
            data={canvasOptions.data}
            width={100}
            height={50}
            options={canvasOptions.options}
        />
    );
};

export default MoviesChart;
