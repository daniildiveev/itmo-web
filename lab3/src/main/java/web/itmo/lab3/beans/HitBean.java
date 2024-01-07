package web.itmo.lab3.beans;

import jakarta.faces.bean.ApplicationScoped;
import jakarta.faces.bean.ManagedBean;

import java.io.Serializable;
import java.time.LocalDateTime;

@ManagedBean(name = "hitBean")
@ApplicationScoped
public class HitBean implements Serializable {
    private float x;
    private float y;
    private float r;
    private String hit;
    private double executionTime;
    private LocalDateTime timestamp;

    public HitBean(){}

    public float getX(){
        return this.x;
    }

    public float getY(){
        return this.y;
    }

    public float getR(){
        return this.r;
    }

    public String getHit(){
        return this.hit;
    }

    public LocalDateTime getTimestamp() {
        return this.timestamp;
    }

    public void setX(float x){
        this.x = x;
    }

    public double getExecutionTime() {
        return this.executionTime;
    }

    public void setY(float y){
        this.y = y;
    }

    public void setR(float R){
        this.r = R;
    }

    public void setHit(String hit){
        this.hit = hit;
    }

    public void setExecutionTime(double seconds) {
        this.executionTime = seconds;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
