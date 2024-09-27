const Point = ({ item, onPointClick }) => {
    return (
        <div
            className={`circle ${item.clicked ? "red-bg" : ""}`}
            style={{
                position: "absolute",
                top: `${item.x}px`,
                left: `${item.y}px`,
            }}
            onClick={() => onPointClick(item)}
        >
            {item.value}
        </div>
    );
};

export default Point;
