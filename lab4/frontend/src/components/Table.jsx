export const Table = props => {
    if (props.points) {
        return (
            <table>
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Résultat</th>
                    <th>Temps d'exécution</th>
                    <th>Horodatage</th>
                    <th>Utilisateur</th>
                </tr>
                </thead>

                <tbody>
                {
                    props.points.map((point, i) => (
                        <tr key={i}>
                            <td>{point.x}</td>
                            <td>{point.y}</td>
                            <td>{point.r}</td>
                            <td>{point.hit.toString()}</td>
                            <td>{point.executionTime}</td>
                            <td>{point.dateTime}</td>
                            <td>{point.username}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
    }
}