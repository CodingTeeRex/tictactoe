export const WinnerComponent = ({ winner }) => {
    const Tie = () => {
        return (
            <h4>It's a tie!</h4>
        );
    }
    return(
        <div className="winner">
            {winner && winner === "tie" ? <Tie /> : (winner && <h4>{winner} is the winner!</h4>)}
        </div>
    );
}