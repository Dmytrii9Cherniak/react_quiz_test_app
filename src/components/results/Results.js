import React from 'react';
import '../results/Results.scss';

function Results(props) {
    return (
        <div className="resultsPage">

            <div>
                <h4> Results page -  quiz </h4>
            </div>

            <ul className="list-group">
                <li className="list-group-item"> Total quiz played -  </li>
                <li className="list-group-item"> Total incorrect answers -  </li>
                <li className="list-group-item"> Total correct answers -  </li>
            </ul>

            <button className="btn btn-primary"> Back to quiz list </button>

        </div>
    );
}

export default Results;