package web.itmo.lab3.database;

import io.github.cdimascio.dotenv.Dotenv;
import web.itmo.lab3.beans.HitBean;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class DBHandler {
    private final String url;
    private final String user;
    private final String password;
    public DBHandler() {
        String dotenvPath = System.getenv("WEB_LAB_3_DOTENV");

        if (dotenvPath == null) {
            System.out.println("Environmental variable WEB_LAB_3_DOTENV not present");
            System.exit(1);
        }

        Dotenv dotenv = Dotenv.configure()
                              .directory(dotenvPath)
                              .load();

        String name = dotenv.get("DB_NAME");
        String port = dotenv.get("DB_PORT");
        String host = dotenv.get("DB_HOST");

        this.user = dotenv.get("DB_USER");
        this.password = dotenv.get("DB_PASSWORD");
        this.url = "jdbc:postgresql://" + host + ":" + port + "/" + name;

        try (Connection conn = DriverManager.getConnection(url, user, password)){
            try (Statement statement = conn.createStatement()){
                statement.executeQuery("CREATE TABLE IF NOT EXISTS hits (" +
                                           "id SERIAL PRIMARY KEY," +
                                           "x FLOAT," +
                                           "y FLOAT," +
                                           "R FLOAT," +
                                           "hit TEXT," +
                                           "date_part TIMESTAMP," +
                                           "execution_time FLOAT" +
                                        ");");

                conn.close();
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        };
    }

    public ArrayList<HitBean> getAllHitChecks() {
        ArrayList<HitBean> beanList = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(this.url)) {
            try (Statement statement = conn.prepareStatement("SELECT * FROM hits")) {
                ResultSet result = statement.getResultSet();

                while (result.next()) {
                    float x = result.getFloat(2);
                    float y = result.getFloat(3);
                    float R = result.getFloat(4);
                    String hit = result.getString(5);
                    LocalDateTime timestamp = result.getTimestamp(6).toLocalDateTime();
                    float executionTime = result.getFloat(7);

                    HitBean newBean = new HitBean();

                    newBean.setX(x);
                    newBean.setY(y);
                    newBean.setR(R);
                    newBean.setHit(hit);
                    newBean.setExecutionTime(executionTime);
                    newBean.setTimestamp(timestamp);

                    beanList.add(newBean);
                }

                conn.close();

                return beanList;
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return new ArrayList<>();
    }

    public void addBean(HitBean bean) {
        String addBeanQuery = "INSERT INTO hits VALUES (DEFAULT, ?, ?, ?, ?, ?, ?) RETURNING id;";

        try (Connection conn = DriverManager.getConnection(this.url, this.user, this.password)) {
            try (PreparedStatement statement = conn.prepareStatement(addBeanQuery)) {
                statement.setFloat(1, bean.getX());
                statement.setFloat(2, bean.getY());
                statement.setFloat(3, bean.getR());
                statement.setString(4, bean.getHit());
                statement.setTimestamp(5, Timestamp.valueOf(bean.getTimestamp()));
                statement.setFloat(6, (float) bean.getExecutionTime());

                statement.executeQuery();
                conn.close();
            }
        } catch (SQLException | NumberFormatException e) {
            System.out.println(e.getMessage());
        }
    }
}
